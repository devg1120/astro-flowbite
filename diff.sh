#diff.sh
#flowbite-astro-admin-dashboard1/
#flowbite-astro-admin-dashboard2/
#flowbite-astro-admin-dashboard3/
diff -r   -y \
 --suppress-common-lines \
 --color \
 --exclude=node_modules \
 --exclude=dist \
 --exclude=yarn.lock \
 flowbite-astro-admin-dashboard1 \
 flowbite-astro-admin-dashboard4


