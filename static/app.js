// Инициализация Telegram WebApp или фейковый объект для локального тестирования
let tg;

if (window.Telegram && window.Telegram.WebApp) {
    // Реальное окружение Telegram
    tg = window.Telegram.WebApp;
    
    // Устанавливаем основные темы на основе Telegram
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color);
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color);
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color);
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color);
    
    // Показываем кнопку в верхней части приложения (MainButton)
    tg.MainButton.setText('ГОТОВО');
    tg.MainButton.color = tg.themeParams.button_color;
    tg.MainButton.textColor = tg.themeParams.button_text_color;
    tg.MainButton.onClick(function() {
        // Отправляем данные в бот при нажатии на MainButton
        tg.sendData(JSON.stringify({action: 'main_button_clicked'}));
    });
    
    // Сообщаем Telegram, что приложение готово к работе
    tg.ready();
} else {
    // Локальное тестирование без Telegram
    console.log('Запуск в режиме локального тестирования');
    
    // Создаем фейковый объект tg для локального тестирования
    tg = {
        initDataUnsafe: {
            user: {
                id: 123456789,
                first_name: 'Тестовый',
                last_name: 'Пользователь',
                language_code: 'ru'
            }
        },
        MainButton: {
            setText: (text) => console.log('MainButton.setText:', text),
            show: () => console.log('MainButton.show вызван'),
            hide: () => console.log('MainButton.hide вызван'),
            onClick: (callback) => {
                console.log('MainButton.onClick установлен');
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        console.log('MainButton нажата (симуляция через Enter)');
                        callback();
                    }
                });
            },
            color: '#1e88e5',
            textColor: '#ffffff'
        },
        HapticFeedback: {
            impactOccurred: (style) => console.log('HapticFeedback:', style)
        },
        sendData: (data) => console.log('sendData:', data),
        ready: () => console.log('WebApp готов'),
        isExpanded: true,
        themeParams: {
            bg_color: '#ffffff',
            text_color: '#000000',
            button_color: '#1e88e5',
            button_text_color: '#ffffff'
        }
    };
}

// Обработка нажатия на кнопку в интерфейсе
document.getElementById('mainButton').addEventListener('click', function() {
    const userData = document.getElementById('userData');
    
    // Показываем информацию о пользователе
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        userData.innerHTML = `
            <p>ID: ${user.id}</p>
            <p>Имя: ${user.first_name} ${user.last_name || ''}</p>
            <p>Язык: ${user.language_code || 'Не указан'}</p>
        `;
    } else {
        userData.innerHTML = '<p>Информация о пользователе недоступна</p>';
    }
    
    // Вибрация при нажатии кнопки
    if (tg.isExpanded) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    // Показываем MainButton
    tg.MainButton.show();
}); 