#!/bin/bash

# Переходим в корневую директорию сайта
cd /home/digital_theatrepro/www

# Бэкапим текущую версию
if [ -d "dist_backup" ]; then
    rm -rf dist_backup
fi
mv * dist_backup_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# Копируем новые файлы
cp -r /tmp/new_build/* ./

# Проверяем права доступа
chmod -R 755 .

echo "Deployment completed successfully!" 