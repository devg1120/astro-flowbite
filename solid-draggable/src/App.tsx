import {
    Accessor,
    Component,
    createEffect,
    createMemo,
    createSignal,
    Index,
    Show,
} from "solid-js";

//import styles from "./App.css";
import styles from "./App.module.css";


interface DragContext {
    // 掴んだアイテムのindex
    index: number;
    // 移動先のindex
    targetIndex: number;
    // 掴んだアイテムのサイズ
    width: number;
    height: number;
    // アイテムの左上位置からのポジション
    itemX: number;
    itemY: number;
}

const Shadow: Component = () => {
    return (
        <div
            classList={{
                [styles.item]: true,
                [styles.shadow]: true,
            }}
        ></div>
    );
};

const App: Component = () => {
    let container: HTMLDivElement | undefined = undefined;
    const [$items, setItems] = createSignal(
        new Array(10).fill(0).map((_, i) => `${i}`)
    );

    const [$dragContext, setDragContext] = createSignal<DragContext | null>();
    const [$mousePosition, setMousePosition] = createSignal<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });

    const item = ($id: Accessor<string>, index: number) => {
        let itemEl: HTMLDivElement | undefined = undefined;

        createEffect(() => {
            const mousePosition = $mousePosition();
            setDragContext((dragContext) => {
                if (dragContext && container && itemEl) {
                    const rect = container.getBoundingClientRect();
                    const itemRect = itemEl.getBoundingClientRect();
                    const itemCenterX =
                        rect.x +
                        mousePosition.x -
                        dragContext.itemX +
                        itemRect.width / 2;

                    const itemCenterY =
                        rect.y +
                        mousePosition.y -
                        dragContext.itemY +
                        itemRect.height / 2;

                    const els = document.elementsFromPoint(
                        itemCenterX,
                        itemCenterY
                    );

                    if (els.includes(itemEl)) {
                        if (index < dragContext.targetIndex) {
                            return {
                                ...dragContext,
                                targetIndex: index,
                            };
                        } else if (index + 1 > dragContext.targetIndex) {
                            return {
                                ...dragContext,
                                targetIndex: index + 1,
                            };
                        }
                    }
                    return dragContext;
                }
                return null;
            });
        });

        return (
            <>
                <Show when={$dragContext()?.targetIndex === index}>
                    <Shadow />
                </Show>

                <div
                    ref={itemEl}
                    classList={{
                        [styles.item]: true,
                        [styles.hidden]: $dragContext()?.index === index,
                    }}
                    onMouseDown={(e) => {
                        e.preventDefault();

                        const el = e.currentTarget as
                            | HTMLDivElement
                            | undefined;

                        if (el) {
                            const rect = el.getBoundingClientRect();

                            setDragContext({
                                index,
                                targetIndex: index,
                                width: rect.width,
                                height: rect.height,
                                itemX: e.clientX - rect.x,
                                itemY: e.clientY - rect.y,
                            });
                        }
                    }}
                >
                    <span style={{ margin: "auto 0", color: "#ccc" }}>
                        <i class="fa-solid fa-grip-vertical"></i>
                    </span>
                    <span
                        style={{
                            margin: "auto 8px",
                            "line-height": 1,
                        }}
                    >
                        {$id()}
                    </span>
                </div>
            </>
        );
    };

    return (
        <div
            ref={container}
            classList={{
                [styles.container]: true,
            }}
            onMouseUp={() => {
                const dragContext = $dragContext();
                const items = $items();

                if (dragContext) {
                    const _items: (string | null)[] = [...items];
                    const item = _items.splice(dragContext.index, 1, null);
                    _items.splice(dragContext.targetIndex, 0, item[0]);
                    setItems(_items.filter((n): n is string => !!n));
                }

                setDragContext(null);
            }}
            onMouseMove={(e) => {
                if (!container) {
                    return;
                }
                const rect = container.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.x,
                    y: e.clientY - rect.y,
                });
            }}
        >
            <Index each={$items()}>{item}</Index>

            <Show when={$dragContext()?.targetIndex === $items().length}>
                <Shadow />
            </Show>

            <Show keyed when={$dragContext()}>
                {(dragContext) => {
                    const $id = createMemo(() => $items()[dragContext.index]);

                    return (
                        <div
                            classList={{
                                [styles.item]: true,
                                [styles.float]: true,
                            }}
                            style={{
                                left: `${
                                    $mousePosition().x - dragContext.itemX
                                }px`,
                                top: `${
                                    $mousePosition().y - dragContext.itemY
                                }px`,
                                width: `${dragContext.width}px`,
                                height: `${dragContext.height}px`,
                            }}
                        >
                            <span style={{ margin: "auto 0", color: "#ccc" }}>
                                <i class="fa-solid fa-grip-vertical"></i>
                            </span>
                            <span
                                style={{ margin: "auto 8px", "line-height": 1 }}
                            >
                                {$id()}
                            </span>
                        </div>
                    );
                }}
            </Show>
        </div>
    );
};

export default App;


