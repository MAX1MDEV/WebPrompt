// ==UserScript==
// @name WebPrompt
// @author MaximDev
// @namespace MAX1MDEV
// @version 2.0
// @homepage https://github.com/MAX1MDEV/WebPrompt
// @supportURL https://github.com/MAX1MDEV/WebPrompt/issues
// @updateURL https://raw.githubusercontent.com/MAX1MDEV/WebPrompt/main/WebPrompt.user.js
// @downloadURL https://raw.githubusercontent.com/MAX1MDEV/WebPrompt/main/WebPrompt.user.js
// @description Command prompt for sites in Windows Terminal style (opens with right Ctrl + right Shift + right Alt)
// @description:ru Командная строка для сайтов в стиле Windows Terminal (открывается с помощью правого Ctrl + правого Shift + правого Alt)
// @match        *://*/*
// @icon         https://img.icons8.com/?size=100&id=WbRVMGxHh74X&format=png&color=000000
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @require https://html2canvas.hertzen.com/dist/html2canvas.min.js
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.href.includes('recaptcha') ||
        window.location.href.includes('captcha') ||
        window.location.href.includes('cloudflare')||
        window !== window.top) {
        return;
    }
    const translations = {
        english: {
            commandPrompt: 'Command Prompt',
            settings: 'Settings',
            changeNickname: 'Change nickname:',
            save: 'Save',
            selectBackground: 'Select background image:',
            reset: 'Reset',
            excludeSites: 'Exclude sites:',
            saveExclusions: 'Save exclusions',
            autoOpen: 'Auto-open console:',
            transparency: 'Console transparency:',
            enterNickname: 'Enter your nickname:',
            availableCommands: 'Available commands:',
            commandNotFound: 'is not recognized as a command. Type help for available commands',
            clearCacheConfirm: 'Are you sure? (Enter [Y]es or [N]o)',
            clearingCache: 'Clearing cache and reloading page...',
            operationCancelled: 'Operation cancelled.',
            saveSiteConfirm: 'Are you sure you want to save the site to your browser\'s default download folder? (Enter [Y]es or [N]o)',
            pageSaved: 'Page saved to downloads folder.',
            noImages: 'No images found on this page.',
            noVideos: 'No videos found on this page.',
            noMedia: 'No images or videos found on this page.',
            foundImages: 'Found images:',
            foundVideos: 'Found videos:',
            downloadConfirm: 'Do you want to download them? (Enter [Y]es or [N]o)',
            downloadStarted: 'Download process started. Check your browser\'s download manager for progress.',
            downloaded: 'Downloaded:',
            downloadError: 'Error downloading',
            browserInfo: 'Command Prompt [Version 2.0] (c) MaximDev. All rights reserved.',
            helpDescription: 'Displays list of available commands',
            helpUsage: 'For detailed command description, type help (command)',
            clearCacheDescription: 'Clears cache and reloads the page',
            clsDescription: 'Clears the console',
            saveSiteDescription: 'Saves the current page to the browser\'s download folder',
            saveSiteImagesDescription: 'Saves all images from the current page',
            saveSiteVideosDescription: 'Saves all videos from the current page',
            saveSiteMediaDescription: 'Saves all images and videos from the current page',
            languageDescription: 'Changes the interface language (english/russian, -en/-ru)',
            languageUsage: 'Usage: language [option] \n Options: english - Switch to English language (-en) | russian - Switch to Russian language (-ru)',
            languageExamples: 'Examples: language english # Switch language to English | language -ru # Switch language to Russian',
            currentLanguage: 'Current language:',
            areYouSure: 'Are you sure?',
            saveSiteConfirm: 'Are you sure you want to save the site to your browser\'s default download folder? (Enter [Y]es or [N]o)',
            savingSite: 'Saving the site...',
            siteSaved: 'Site saved successfully.',
            noImagesToSave: 'No images found on this page to save.',
            noVideosToSave: 'No videos found on this page to save.',
            noMediaToSave: 'No images or videos found on this page to save.',
            foundImagesToSave: 'Found {0} image(s) to save. Do you want to proceed? (Enter [Y]es or [N]o)',
            foundVideosToSave: 'Found {0} video(s) to save. Do you want to proceed? (Enter [Y]es or [N]o)',
            foundMediaToSave: 'Found {0} image(s) and {1} video(s) to save. Do you want to proceed? (Enter [Y]es or [N]o)',
            savingFiles: 'Saving files...',
            filesSaved: 'Files saved successfully.',
            screenshotDescription: 'Takes a screenshot of the current page',
            translateDescription: 'Translates the current page to a specified language',
            darkmodeDescription: 'Toggles dark mode for the current page',
            timerDescription: 'Sets a timer for a specified number of minutes',
            calcDescription: 'Performs a calculation',
            weatherDescription: 'Shows the weather for a specified city',
            summarizeDescription: 'Provides a brief summary of the current page',
            darkModeEnabled: 'Dark mode enabled',
            darkModeDisabled: 'Dark mode disabled',
            weatherIn: 'Weather in {city}',
            temperature: 'Temperature',
            errorFetchingWeather: 'Error fetching weather data',
            takingScreenshot: 'Taking screenshot...',
            screenshotSaved: 'Screenshot saved',
            screenshotError: 'Error taking screenshot',
            translationAlreadyActive: 'Translation is already active',
            translationScriptError: 'Error loading translation script',
            translationActivated: 'Translation activated',
            darkModeEnabled: 'Dark mode enabled for this site',
            steamDescription: 'Steam helper in two languages',
            steamMissingCommand: 'steam: missing command\n\nUsage: steam <command>\nEnter: help steam for details',
            steamUnknownCommand: 'Unknown steam command. Use "help steam" for available commands.',
            steamHelp: 'Steam: Steam helper\nUsage: steam <command>\n\nCommands:\n-clearwhitelist {time in milliseconds} <stop> Clear whitelist\n-monthlyincome {number of months} Display of income for the period',
            steamWishlistError: 'Error: This command can only be used on Steam wishlist pages.',
            steamClearingStopped: 'Stopped clearing whitelist.',
            steamNoActiveClearing: 'No active whitelist clearing process to stop.',
            steamClearingStarted: 'Started clearing whitelist. Interval: {interval}ms. Use "steam -clearwhitelist stop" to stop.',
            steamIncomeError: 'Error: This command can only be used on the purchase history page of a Steam account.',
            steamNoHistoryError: 'Error: Could not find purchase history on this page.',
            steamIncomeResult: 'Your income for {months} month(s) is: {income} {currency}',
            steamIncomeFetchError: 'Error: Could not calculate income. Make sure you have sufficient purchase history.',
            steamIncomeLoss: 'You did not earn anything for {months} month(s), you lost: {loss} {currency}'
        },
        russian: {
            commandPrompt: 'Командная строка',
            settings: 'Настройки',
            changeNickname: 'Изменить никнейм:',
            save: 'Сохранить',
            selectBackground: 'Выбрать фоновое изображение:',
            reset: 'Сбросить',
            excludeSites: 'Исключить сайты:',
            saveExclusions: 'Сохранить исключения',
            autoOpen: 'Автоматически открывать консоль:',
            transparency: 'Прозрачность консоли:',
            enterNickname: 'Введите ваш никнейм:',
            availableCommands: 'Доступные команды:',
            commandNotFound: 'не является командой. Введите help для списка команд',
            clearCacheConfirm: 'Вы уверены? (Введите [Y]es или [N]o)',
            clearingCache: 'Очистка кэша и перезагрузка страницы...',
            operationCancelled: 'Операция отменена.',
            saveSiteConfirm: 'Вы уверены, что хотите сохранить сайт в стандартную папку загрузок браузера? (Введите [Y]es или [N]o)',
            pageSaved: 'Страница сохранена в папку загрузок.',
            noImages: 'На этой странице нет изображений.',
            noVideos: 'На этой странице нет видео.',
            noMedia: 'На этой странице нет изображений или видео.',
            foundImages: 'Найдено изображений:',
            foundVideos: 'Найдено видео:',
            downloadConfirm: 'Хотите загрузить их? (Введите [Y]es или [N]o)',
            downloadStarted: 'Процесс загрузки начался. Проверьте прогресс в менеджере загрузок браузера.',
            downloaded: 'Загружено:',
            downloadError: 'Ошибка при загрузке',
            browserInfo: 'Командная строка [Версия 2.0] (c) MaximDev. Все права защищены.',
            helpDescription: 'Выводит список доступных команд',
            helpUsage: 'Для подробного описания команды введите help (команда)',
            clearCacheDescription: 'Очищает кэш и перезагружает страницу',
            clsDescription: 'Очищает консоль',
            saveSiteDescription: 'Сохраняет текущую страницу в папку загрузок браузера',
            saveSiteImagesDescription: 'Сохраняет все изображения с текущей страницы',
            saveSiteVideosDescription: 'Сохраняет все видео с текущей страницы',
            saveSiteMediaDescription: 'Сохраняет все изображения и видео с текущей страницы',
            languageDescription: 'Изменяет язык интерфейса (english/russian, -en/-ru)',
            languageUsage: 'Использование: language [опция] \n Опции: english - Переключить на английский язык (-en) | russian - Переключить на русский язык (-ru)',
            languageExamples: 'Примеры: language english # Переключить язык на английский | language -ru # Переключить язык на русский',
            currentLanguage: 'Текущий язык:',
            areYouSure: 'Вы уверены?',
            saveSiteConfirm: 'Вы уверены, что хотите сохранить сайт в стандартную папку загрузок браузера? (Введите [Y]es или [N]o)',
            savingSite: 'Сохранение сайта...',
            siteSaved: 'Сайт успешно сохранен.',
            noImagesToSave: 'На этой странице нет изображений для сохранения.',
            noVideosToSave: 'На этой странице нет видео для сохранения.',
            noMediaToSave: 'На этой странице нет изображений или видео для сохранения.',
            foundImagesToSave: 'Найдено {0} изображений для сохранения. Хотите продолжить? (Введите [Y]es или [N]o)',
            foundVideosToSave: 'Найдено {0} видео для сохранения. Хотите продолжить? (Введите [Y]es или [N]o)',
            foundMediaToSave: 'Найдено {0} изображений и {1} видео для сохранения. Хотите продолжить? (Введите [Y]es или [N]o)',
            savingFiles: 'Сохранение файлов...',
            filesSaved: 'Файлы успешно сохранены.',
            screenshotDescription: 'Делает скриншот текущей страницы',
            translateDescription: 'Переводит текущую страницу на указанный язык',
            darkmodeDescription: 'Включает/выключает темный режим для текущей страницы',
            timerDescription: 'Устанавливает таймер на указанное количество минут',
            calcDescription: 'Выполняет вычисление',
            weatherDescription: 'Показывает погоду для указанного города',
            summarizeDescription: 'Предоставляет краткое содержание текущей страницы',
            darkModeEnabled: 'Темный режим включен',
            darkModeDisabled: 'Темный режим выключен',
            weatherIn: 'Погода в {city}',
            temperature: 'Температура',
            errorFetchingWeather: 'Ошибка при получении данных о погоде',
            takingScreenshot: 'Делаю скриншот...',
            screenshotSaved: 'Скриншот сохранен',
            screenshotError: 'Ошибка при создании скриншота',
            translationAlreadyActive: 'Перевод уже активирован',
            translationScriptError: 'Ошибка загрузки скрипта перевода',
            translationActivated: 'Перевод активирован',
            steamDescription: 'Помощник для steam на двух языках',
            steamMissingCommand: 'steam: отсутствует команда\n\nИспользование: steam <command>\nВведите: help steam для подробностей',
            steamUnknownCommand: 'Неизвестная команда steam. Используйте "help steam" для просмотра доступных команд.',
            steamHelp: 'Steam: Помощник для steam\nИспользование: steam <command>\n\nКоманды:\n-clearwhitelist {время в милисекундах} <stop> Очистка вайтлиста\n-monthlyincome {количество месяцев} Отображение дохода за период',
            steamWishlistError: 'Ошибка: Эта команда может быть использована только на страницах списка желаемого Steam.',
            steamClearingStopped: 'Очистка списка желаемого остановлена.',
            steamNoActiveClearing: 'Нет активного процесса очистки списка желаемого для остановки.',
            steamClearingStarted: 'Начата очистка списка желаемого. Интервал: {interval}мс. Используйте "steam -clearwhitelist stop" для остановки.',
            steamIncomeError: 'Ошибка: Эта команда может быть использована только на странице истории покупок аккаунта Steam.',
            steamNoHistoryError: 'Ошибка: Не удалось найти историю покупок на этой странице.',
            steamIncomeResult: 'Ваш доход за {months} месяц(ев) составляет: {income} {currency}',
            steamIncomeFetchError: 'Ошибка: Не удалось рассчитать доход. Убедитесь, что у вас достаточно истории покупок.',
            steamIncomeLoss: 'Вы не заработали ничего за {months} месяц(ев), вы потеряли: {loss} {currency}'
        }
    };
    const style = document.createElement('style');
    style.textContent = `
        #command-panel,
        #command-panel *,
        #command-panel *::before,
        #command-panel *::after {
            all: revert;
        }
         #command-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 700px;
            height: 400px;
            border-radius: 5px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
            font-family: 'Cascadia Code', 'Consolas', monospace;
            color: #CCCCCC;
            z-index: 9999999;
            display: none;
            overflow: hidden;
            border: 1px solid #4D4D4D;
            resize: both;
            flex-direction: column;
        }
        #command-panel-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(12, 12, 12, 0.8);
            z-index: -2;
        }
        #command-panel-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://i.imgur.com/CAuoM5p.jpeg');
            background-size: cover;
            background-position: center;
            opacity: 0.2;
            z-index: -1;
        }
        #command-panel-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        #command-panel-header {
            background-color: #191919;
            padding: 5px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #4D4D4D;
            user-select: none;
            cursor: move;
        }
        #command-panel-title {
            font-size: 14px;
            font-weight: normal;
        }
        #command-panel-controls {
            display: flex;
            align-items: center;
        }
        #command-panel-close, #command-panel-settings {
            cursor: pointer;
            color: #CCCCCC;
            font-size: 18px;
            margin-left: 10px;
        }
        #command-content {
            height: calc(100% - 30px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding: 10px;
            cursor: default;
        }
        #command-input-wrapper {
            position: sticky;
            bottom: 0;
            background: inherit;
            display: flex;
            align-items: center;
            padding: 5px 0;
            margin-top: auto;
        }
        #command-prompt {
            color: #16C60C;
            margin-right: 5px;
            user-select: none;
        }
        #command-input {
            width: 100%;
            background-color: transparent;
            border: none;
            color: #CCCCCC;
            font-size: 14px;
            font-family: 'Cascadia Code', 'Consolas', monospace;
            outline: none;
            cursor: default;
        }
        #command-output {
            flex: 1;
            overflow-y: auto;
            margin-bottom: 10px;
            white-space: pre-wrap;
            word-wrap: break-word;
            user-select: none;
        }
        #command-output p {
            margin: 0;
            line-height: 1.3;
        }
        #command-panel ::-webkit-scrollbar {
            width: 12px;
        }
        #command-panel ::-webkit-scrollbar-track {
            background: #0C0C0C;
        }
        #command-panel ::-webkit-scrollbar-thumb {
            background-color: #4D4D4D;
            border-radius: 6px;
            border: 3px solid #0C0C0C;
        }
        #settings-content {
            display: none;
            height: calc(100% - 30px);
            overflow-y: auto;
            padding: 10px;
            user-select: none;
        }
        #settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        #settings-header span:nth-child(2) {
            flex-grow: 1;
            text-align: center;
        }
        #settings-back {
            cursor: pointer;
            font-size: 24px;
            margin-right: 10px;
        }
        #command-panel * {
            user-select: none;
        }
        #command-input {
            user-select: text;
        }
        #nickname-prompt {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #191919;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #4D4D4D;
            z-index: 10000;
            user-select: none;
        }
        #exclude-sites {
            margin-top: 10px;
            margin-bottom: 5px;
        }
        #background-image-input {
            margin-top: 10px;
        }
        #reset-background {
            margin-left: 10px;
        }
        #auto-open-toggle {
            margin-left: 10px;
        }
        #transparency-slider {
            width: 100%;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);
    const panel = document.createElement('div');
    panel.id = 'command-panel';
    panel.innerHTML = `
        <div id="command-panel-background"></div>
        <div id="command-panel-image"></div>
        <div id="command-panel-content">
            <div id="command-panel-header">
                <span id="command-panel-title">Command Prompt</span>
                <div id="command-panel-controls">
                    <span id="command-panel-settings">&#9881;</span>
                    <span id="command-panel-close">&times;</span>
                </div>
            </div>
            <div id="command-content">
                <div id="browser-info"></div>
                <div id="command-output"></div>
                <div id="command-input-wrapper">
                    <span id="command-prompt"></span>
                    <input type="text" id="command-input" autocomplete="off" autofocus>
                </div>
            </div>
            <div id="settings-content">
                <div id="settings-header">
                    <span id="settings-back">←</span>
                    <span>Настройки</span>
                    <span></span>
                </div>
                <p>Изменить никнейм:</p>
                <input type="text" id="nickname-change">
                <button id="save-nickname">Сохранить</button>
                <p>Выбрать фоновое изображение:</p>
                <input type="file" id="background-image-input" accept="image/*">
                <button id="reset-background">Сбросить</button>
                <p>Исключить сайты:</p>
                <textarea id="exclude-sites" placeholder="Введите URL сайтов, разделенных запятыми"></textarea>
                <button id="save-exclusions">Сохранить исключения</button>
                <p>Автоматически открывать консоль:</p>
                <input type="checkbox" id="auto-open-toggle">
                <p>Прозрачность консоли:</p>
                <input type="range" id="transparency-slider" min="0" max="100" value="80">
            </div>
        </div>
        <div id="nickname-prompt">
            <p>Введите ваш никнейм:</p>
            <input type="text" id="nickname-input">
            <button id="nickname-submit">OK</button>
        </div>
    `;
    document.body.appendChild(panel);
    const commandInput = document.getElementById('command-input');
    const commandOutput = document.getElementById('command-output');
    const closeButton = document.getElementById('command-panel-close');
    const settingsButton = document.getElementById('command-panel-settings');
    const nicknamePrompt = document.getElementById('nickname-prompt');
    const nicknameInput = document.getElementById('nickname-input');
    const nicknameSubmit = document.getElementById('nickname-submit');
    const commandContent = document.getElementById('command-content');
    const settingsContent = document.getElementById('settings-content');
    const backToConsole = document.getElementById('settings-back');
    const nicknameChange = document.getElementById('nickname-change');
    const saveNickname = document.getElementById('save-nickname');
    const excludeSites = document.getElementById('exclude-sites');
    const saveExclusions = document.getElementById('save-exclusions');
    const browserInfo = document.getElementById('browser-info');
    const backgroundImageInput = document.getElementById('background-image-input');
    const resetBackgroundButton = document.getElementById('reset-background');
    const panelHeader = document.getElementById('command-panel-header');
    const commandPanel = document.getElementById('command-panel');
    const autoOpenToggle = document.getElementById('auto-open-toggle');
    let nickname = GM_getValue('commandPanelNickname', '');
    let commandHistory = JSON.parse(GM_getValue('commandPanelHistory', '[]'));
    let historyIndex = -1;
    let excludedSites = JSON.parse(GM_getValue('commandPanelExcludedSites', '[]'));
    let autoOpen = GM_getValue('commandPanelAutoOpen', false);
    let panelPosition = GM_getValue('commandPanelPosition', null);

    function updatePrompt() {
        document.getElementById('command-prompt').textContent = `${nickname}:~#`;
    }
    function showNicknamePrompt() {
        nicknamePrompt.style.display = 'block';
    }
    function hideNicknamePrompt() {
        nicknamePrompt.style.display = 'none';
    }
    function setNickname(newNickname) {
        nickname = newNickname || 'User';
        GM_setValue('commandPanelNickname', nickname);
        updatePrompt();
    }
    function getBrowserInfo() {
        return `Command Prompt [Version 1.0] (c) MaximDev. Все права защищены.`;
    }
    function updateBrowserInfo() {
    const lang = GM_getValue('commandPanelLanguage', 'english');
    const t = translations[lang];
    browserInfo.textContent = t.browserInfo;
}
    function setBackgroundImage(imageUrl) {
        document.getElementById('command-panel-image').style.backgroundImage = `url('${imageUrl}')`;
        GM_setValue('commandPanelBackgroundImage', imageUrl);
    }
    function resetBackgroundImage() {
        setBackgroundImage('https://i.imgur.com/CAuoM5p.jpeg');
    }
    nicknameSubmit.addEventListener('click', function() {
        setNickname(nicknameInput.value);
        hideNicknamePrompt();
    });
    function clearCacheAndReload() {
        if (window.caches) {
            caches.keys().then(function(names) {
                for (let name of names) caches.delete(name);
            });
        }
        window.location.reload(true);
    }
    const commands = {
        help: {
            descriptionKey: 'helpDescription',
            action: function(args) {
                const lang = GM_getValue('commandPanelLanguage', 'english');
                const t = translations[lang];
                if (args.length > 0) {
                    const cmd = args[0].toLowerCase();
                    if (cmd === 'steam') {
                        commandOutput.innerHTML += `<p>${t.steamHelp}</p>`;
                    } else if (commands[cmd]) {
                        commandOutput.innerHTML += `<p>${cmd}: ${t[commands[cmd].descriptionKey]}</p>`;
                    } else {
                        commandOutput.innerHTML += `<p class="error-text">${args[0]} ${t.commandNotFound}</p>`;
                    }
                } else {
                    commandOutput.innerHTML += `<p>${t.availableCommands} ${Object.keys(commands).join(', ')}</p>`;
                    commandOutput.innerHTML += `<p>${t.helpUsage}</p>`;
                }
            }
        },
        clearcache: {
            descriptionKey: 'clearCacheDescription',
            action: function() {
                const lang = GM_getValue('commandPanelLanguage', 'english');
                const t = translations[lang];
                commandOutput.innerHTML += `<p>${t.areYouSure} (${t.clearCacheConfirm})</p>`;
                commandInput.value = '';
                commandInput.setAttribute('data-waiting-confirmation', 'clearcache');
            }
        },
        cls: {
            descriptionKey: 'clsDescription',
            action: function() {
                commandOutput.innerHTML = '';
            }
        },
        savesite: {
            descriptionKey: 'saveSiteDescription',
            action: function() {
                promptSaveSite();
            }
        },
        savesiteimages: {
            descriptionKey: 'saveSiteImagesDescription',
            action: saveSiteImages
        },
        savesitevideos: {
            descriptionKey: 'saveSiteVideosDescription',
            action: saveSiteVideos
        },
        savesitemedia: {
            descriptionKey: 'saveSiteMediaDescription',
            action: saveSiteMedia
        },
        language: {
            descriptionKey: 'languageDescription',
            action: function(args) {
                const lang = GM_getValue('commandPanelLanguage', 'english');
                const t = translations[lang];

                if (args.length === 0) {
                    commandOutput.innerHTML += `<p>${t.currentLanguage} ${lang}</p>`;
                    commandOutput.innerHTML += `<p>${t.languageUsage}</p>`;
                    commandOutput.innerHTML += `<p>${t.languageExamples}</p>`;
                    return;
                }

                const newLang = args[0].toLowerCase();
                if (['english', '-en'].includes(newLang)) {
                    setLanguage('english');
                    commandOutput.innerHTML += '<p>Language changed to English</p>';
                } else if (['russian', '-ru'].includes(newLang)) {
                    setLanguage('russian');
                    commandOutput.innerHTML += '<p>Язык изменен на русский</p>';
                } else {
                    commandOutput.innerHTML += '<p>Invalid language. Use: english/-en or russian/-ru</p>';
                }
            }
        },
        screenshot: {
            descriptionKey: 'screenshotDescription',
            action: function() {
                const lang = GM_getValue('commandPanelLanguage', 'english');
                const t = translations[lang];
                commandOutput.innerHTML += `<p>${t.takingScreenshot}</p>`;
                html2canvas(document.documentElement, {
                    height: window.innerHeight,
                    windowHeight: window.innerHeight,
                    scrollY: -window.scrollY
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'screenshot.png';
                    link.href = canvas.toDataURL();
                    link.click();
                    commandOutput.innerHTML += `<p>${t.screenshotSaved}</p>`;
                }).catch(error => {
                    console.error('Screenshot error:', error);
                    commandOutput.innerHTML += `<p>${t.screenshotError}</p>`;
                });
            }
        },
        translate: {
                descriptionKey: 'translateDescription',
                action: function(args) {
                    const lang = GM_getValue('commandPanelLanguage', 'english');
                    const t = translations[lang];
                    const targetLang = args[0] || 'en';
                    if (document.getElementById('google_translate_element')) {
                        commandOutput.innerHTML += `<p>${t.translationAlreadyActive}</p>`;
                        return;
                    }
                    const translateElement = document.createElement('div');
                    translateElement.id = 'google_translate_element';
                    translateElement.style.position = 'fixed';
                    translateElement.style.top = '10px';
                    translateElement.style.right = '10px';
                    translateElement.style.zIndex = '9999999';
                    document.body.appendChild(translateElement);
                    const script = document.createElement('script');
                    script.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
                    script.onerror = () => {
                        commandOutput.innerHTML += `<p>${t.translationScriptError}</p>`;
                    };
                    document.body.appendChild(script);
                    unsafeWindow.googleTranslateElementInit = function() {
                        new google.translate.TranslateElement({
                            pageLanguage: 'auto',
                            includedLanguages: 'en,ru,es,fr,de,it,pt,ja,ko,zh-CN,ar',
                            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                        }, 'google_translate_element');
                        commandOutput.innerHTML += `<p>${t.translationActivated}</p>`;
                    };
                }
            },
        darkmode: {
                descriptionKey: 'darkmodeDescription',
                action: function() {
                    const lang = GM_getValue('commandPanelLanguage', 'english');
                    const t = translations[lang];
                    const currentUrl = window.location.hostname;
                    let darkModeUrls = GM_getValue('darkModeUrls', []);
                    if (darkModeUrls.includes(currentUrl)) {
                        darkModeUrls = darkModeUrls.filter(url => url !== currentUrl);
                        const darkModeStyle = document.getElementById('darkModeStyle');
                        if (darkModeStyle) {
                            darkModeStyle.remove();
                        }
                        commandOutput.innerHTML += `<p>${t.darkModeDisabled}</p>`;
                    } else {
                        darkModeUrls.push(currentUrl);
                        const style = document.createElement('style');
                        style.id = 'darkModeStyle';
                        style.textContent = `
                            body, body * {
                                background-color: #1a1a1a !important;
                                color: #e0e0e0 !important;
                                border-color: #333 !important;
                            }
                        `;
                        document.head.appendChild(style);
                        commandOutput.innerHTML += `<p>${t.darkModeEnabled}</p>`;
                    }
                    GM_setValue('darkModeUrls', darkModeUrls);
                }
            },
        timer: {
            descriptionKey: 'timerDescription',
            action: function(args) {
                const minutes = parseInt(args[0]) || 5;
                const seconds = minutes * 60;
                let remainingTime = seconds;
                const intervalId = setInterval(() => {
                    remainingTime--;
                    const mins = Math.floor(remainingTime / 60);
                    const secs = remainingTime % 60;
                    commandOutput.innerHTML += `<p>Remaining time: ${mins}:${secs.toString().padStart(2, '0')}</p>`;
                    if (remainingTime <= 0) {
                        clearInterval(intervalId);
                        alert('Timer finished!');
                    }
                }, 1000);
            }
        },
        calc: {
            descriptionKey: 'calcDescription',
            action: function(args) {
                const expression = args.join(' ');
                try {
                    const result = eval(expression);
                    commandOutput.innerHTML += `<p>Result: ${result}</p>`;
                } catch (error) {
                    commandOutput.innerHTML += `<p>Error: Invalid expression</p>`;
                }
            }
        },
        weather: {
                descriptionKey: 'weatherDescription',
                action: function(args) {
                    const lang = GM_getValue('commandPanelLanguage', 'english');
                    const t = translations[lang];
                    const city = args.join(' ') || 'Moscow';
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: `https://open-weather13.p.rapidapi.com/city/${encodeURIComponent(city)}/${lang === 'english' ? 'EN' : 'RU'}`,
                        headers: {
                            "x-rapidapi-key": "d38edf19d1msh96b9a6f2387f7a5p11277fjsndd57f1eea2c4",
                            "x-rapidapi-host": "open-weather13.p.rapidapi.com"
                        },
                        onload: function(response) {
                            if (response.status === 200) {
                                const data = JSON.parse(response.responseText);
                                const weather = data.weather[0].description;
                                const temp = data.main.temp;
                                commandOutput.innerHTML += `<p>${t.weatherIn.replace('{city}', city)}: ${weather}, ${t.temperature}: ${temp}°C</p>`;
                            } else {
                                commandOutput.innerHTML += `<p>${t.errorFetchingWeather}</p>`;
                            }
                        },
                        onerror: function(error) {
                            commandOutput.innerHTML += `<p>${t.errorFetchingWeather}</p>`;
                        }
                    });
                }
            },
        summarize: {
            descriptionKey: 'summarizeDescription',
            action: function() {
                const text = document.body.innerText;
                const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
                const summary = sentences.slice(0, 3).join(' ');
                commandOutput.innerHTML += `<p>Summary: ${summary}</p>`;
            }
        },
        steam: {
            descriptionKey: 'steamDescription',
            action: function(args) {
                const lang = GM_getValue('commandPanelLanguage', 'english');
                const t = translations[lang];

                if (args.length === 0) {
                    commandOutput.innerHTML += `<p>${t.steamMissingCommand}</p>`;
                    return;
                }

                const subCommand = args[0].toLowerCase();

                switch (subCommand) {
                    case '-clearwhitelist':
                        handleClearWhitelist(args.slice(1));
                        break;
                    case '-monthlyincome': {
                        const months = args[1] ? parseInt(args[1]) : 1;
                        handleMonthlyIncome(months);
                        break;
                    }
                    default:
                        commandOutput.innerHTML += `<p>${t.steamUnknownCommand}</p>`;
                }
            }
        }
    };
    function promptSaveSite() {
            const lang = GM_getValue('commandPanelLanguage', 'english');
            const t = translations[lang];
            commandOutput.innerHTML += `<p>${t.saveSiteConfirm}</p>`;
            commandInput.value = '';
            commandInput.setAttribute('data-waiting-confirmation', 'savesite');
    }

    function handleSaveSiteConfirmation(command) {
        const lang = GM_getValue('commandPanelLanguage', 'english');
        const t = translations[lang];
        const cmd = command.toLowerCase();
        if (cmd === 'y' || cmd === 'yes') {
            commandOutput.innerHTML += `<p>${t.savingSite}</p>`;
            const pageTitle = document.title || 'untitled';
            const fileName = pageTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.html';

            const content = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
            const blob = new Blob([content], {type: 'text/html;charset=utf-8'});

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);

            link.click();

            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }, 100);

            commandOutput.innerHTML += `<p>${t.siteSaved}</p>`;
        } else {
            commandOutput.innerHTML += `<p>${t.operationCancelled}</p>`;
        }
        commandInput.removeAttribute('data-waiting-confirmation');
    }
    function saveSiteImages() {
            const lang = GM_getValue('commandPanelLanguage', 'english');
            const t = translations[lang];
            const images = document.querySelectorAll('img');
            const imageUrls = Array.from(images)
                .map(img => img.src)
                .filter(src => /\.(png|jpg|jpeg)$/i.test(src));

            if (imageUrls.length === 0) {
                commandOutput.innerHTML += `<p>${t.noImagesToSave}</p>`;
                return;
            }

            commandOutput.innerHTML += `<p>${t.foundImagesToSave.replace('{0}', imageUrls.length)}</p>`;
            commandInput.value = '';
            commandInput.setAttribute('data-waiting-confirmation', 'savesiteimages');
    }

    function saveSiteVideos() {
        const lang = GM_getValue('commandPanelLanguage', 'english');
        const t = translations[lang];
        const videos = document.querySelectorAll('video');
        const videoUrls = Array.from(videos)
            .map(video => video.src)
            .filter(src => /\.(mkv|mp4)$/i.test(src));

        if (videoUrls.length === 0) {
            commandOutput.innerHTML += `<p>${t.noVideosToSave}</p>`;
            return;
        }

        commandOutput.innerHTML += `<p>${t.foundVideosToSave.replace('{0}', videoUrls.length)}</p>`;
        commandInput.value = '';
        commandInput.setAttribute('data-waiting-confirmation', 'savesitevideos');
    }

    function saveSiteMedia() {
        const lang = GM_getValue('commandPanelLanguage', 'english');
        const t = translations[lang];
        const images = document.querySelectorAll('img');
        const videos = document.querySelectorAll('video');
        const imageUrls = Array.from(images)
            .map(img => img.src)
            .filter(src => /\.(png|jpg|jpeg)$/i.test(src));
        const videoUrls = Array.from(videos)
            .map(video => video.src)
            .filter(src => /\.(mkv|mp4)$/i.test(src));

        if (imageUrls.length === 0 && videoUrls.length === 0) {
            commandOutput.innerHTML += `<p>${t.noMediaToSave}</p>`;
            return;
        }

        commandOutput.innerHTML += `<p>${t.foundMediaToSave.replace('{0}', imageUrls.length).replace('{1}', videoUrls.length)}</p>`;
        commandInput.value = '';
        commandInput.setAttribute('data-waiting-confirmation', 'savesitemedia');
    }

    function handleCommand(command) {
        const args = command.split(' ');
        const cmd = args.shift().toLowerCase();
        const lang = GM_getValue('commandPanelLanguage', 'english');
        const t = translations[lang];

        commandInput.value = '';

        commandOutput.innerHTML += `<p><span style="color: #16C60C;">${nickname}:~#</span> ${command}</p>`;
        const waitingConfirmation = commandInput.getAttribute('data-waiting-confirmation');
        if (waitingConfirmation) {
            if (waitingConfirmation === 'clearcache') {
                if (cmd === 'y' || cmd === 'yes') {
                    commandOutput.innerHTML += `<p>${t.clearingCache}</p>`;
                    setTimeout(clearCacheAndReload, 1500);
                } else {
                    commandOutput.innerHTML += `<p>${t.operationCancelled}</p>`;
                }
                commandInput.removeAttribute('data-waiting-confirmation');
            } else if (waitingConfirmation === 'savesite') {
                handleSaveSiteConfirmation(command);
            } else if (['savesiteimages', 'savesitevideos', 'savesitemedia'].includes(waitingConfirmation)) {
                handleMediaConfirmation(command, waitingConfirmation);
            }
        } else if (commands[cmd]) {
            commands[cmd].action(args);
        } else {
            commandOutput.innerHTML += `<p class="error-text">"${cmd}" ${t.commandNotFound}</p>`;
        }
        if (cmd === 'clearwhitelist') {
            handleClearWhitelist(args);
        }
        if (!Array.isArray(commandHistory)) {
            commandHistory = [];
        }
        commandHistory.push(command);
        GM_setValue('commandPanelHistory', JSON.stringify(commandHistory));
        historyIndex = -1;
        commandContent.scrollTop = commandContent.scrollHeight;
        setTimeout(() => {
            const outputElement = document.getElementById('command-output');
            outputElement.scrollTop = outputElement.scrollHeight;
        }, 0);
    }

    function handleMediaConfirmation(command, type) {
        const lang = GM_getValue('commandPanelLanguage', 'english');
        const t = translations[lang];
        const cmd = command.toLowerCase();
        if (cmd === 'y' || cmd === 'yes') {
            let mediaUrls = [];
            if (type === 'savesiteimages' || type === 'savesitemedia') {
                const images = document.querySelectorAll('img');
                mediaUrls = mediaUrls.concat(Array.from(images)
                    .map(img => img.src)
                    .filter(src => /\.(png|jpg|jpeg)$/i.test(src)));
            }
            if (type === 'savesitevideos' || type === 'savesitemedia') {
                const videos = document.querySelectorAll('video');
                mediaUrls = mediaUrls.concat(Array.from(videos)
                    .map(video => video.src)
                    .filter(src => /\.(mkv|mp4)$/i.test(src)));
            }

            commandOutput.innerHTML += `<p>${t.savingFiles}</p>`;

            mediaUrls.forEach(url => {
                GM_download({
                    url: url,
                    name: url.split('/').pop(),
                    onload: () => {
                        commandOutput.innerHTML += `<p>${t.downloaded} ${url}</p>`;
                    },
                    onerror: (error) => {
                        commandOutput.innerHTML += `<p>${t.downloadError} ${url}: ${error.error}</p>`;
                    }
                });
            });

            commandOutput.innerHTML += `<p>${t.filesSaved}</p>`;
        } else {
            commandOutput.innerHTML += `<p>${t.operationCancelled}</p>`;
        }
        commandInput.removeAttribute('data-waiting-confirmation');
    }
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.altKey) {
            e.preventDefault();
            const currentUrl = window.location.href;
            if (!excludedSites.some(site => currentUrl.includes(site))) {
                panel.style.display = 'block';
                if (!nickname) {
                    showNicknamePrompt();
                }
                updateBrowserInfo();
                commandInput.focus();
                if (panelPosition) {
                    commandPanel.style.left = panelPosition.left;
                    commandPanel.style.top = panelPosition.top;
                    commandPanel.style.transform = 'none';
                }
            }
        } else if (e.key === 'Escape' && panel.style.display === 'block') {
            panel.style.display = 'none';
        }
    });
    panel.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });

    panel.addEventListener('click', function(e) {
        if (e.target === panel || e.target.closest('#command-content')) {
            commandInput.focus();
        }
    });
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            if (command.length > 0) {
                handleCommand(command);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[commandHistory.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                this.value = '';
            }
        }
    });
    closeButton.addEventListener('click', function() {
        panel.style.display = 'none';
    });
    settingsButton.addEventListener('click', function() {
        const currentHeight = commandPanel.style.height;
        const currentWidth = commandPanel.style.width;
        commandContent.style.display = 'none';
        settingsContent.style.display = 'block';
        nicknameChange.value = nickname;
        excludeSites.value = excludedSites.join(', ');
        autoOpenToggle.checked = autoOpen;
        const currentOpacity = parseFloat(document.getElementById('command-panel-background').style.backgroundColor.split(',')[3]) || 0.8;
        transparencySlider.value = currentOpacity * 100;
        if (parseInt(currentHeight) < 600) {
            commandPanel.style.height = '600px';
        }
    });

    backToConsole.addEventListener('click', function() {
        const currentDimensions = {
            width: commandPanel.style.width,
            height: commandPanel.style.height
        };
        settingsContent.style.display = 'none';
        commandContent.style.display = 'flex';
        if (currentDimensions.width) commandPanel.style.width = currentDimensions.width;
        if (currentDimensions.height) commandPanel.style.height = currentDimensions.height;
        const commandInputWrapper = document.getElementById('command-input-wrapper');
        if (commandInputWrapper) {
            commandInputWrapper.style.position = 'sticky';
            commandInputWrapper.style.bottom = '0';
        }
        const commandOutput = document.getElementById('command-output');
        if (commandOutput) {
            commandOutput.style.display = 'none';
            setTimeout(() => {
                commandOutput.style.display = 'block';
                commandOutput.scrollTop = commandOutput.scrollHeight;
            }, 0);
        }
        commandInput.focus();
    });
    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            if (entry.target === commandPanel) {
                const commandInputWrapper = document.getElementById('command-input-wrapper');
                if (commandInputWrapper) {
                    commandInputWrapper.style.position = 'sticky';
                    commandInputWrapper.style.bottom = '0';
                }
                const commandOutput = document.getElementById('command-output');
                if (commandOutput && commandOutput.style.display !== 'none') {
                    commandOutput.scrollTop = commandOutput.scrollHeight;
                }
            }
        }
    });

    resizeObserver.observe(commandPanel);
    saveNickname.addEventListener('click', function() {
        setNickname(nicknameChange.value);
        settingsContent.style.display = 'none';
        commandContent.style.display = 'block';
    });
    saveExclusions.addEventListener('click', function() {
        excludedSites = excludeSites.value.split(',').map(site => site.trim());
        GM_setValue('commandPanelExcludedSites', JSON.stringify(excludedSites));
    });
    backgroundImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setBackgroundImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    resetBackgroundButton.addEventListener('click', resetBackgroundImage);
    autoOpenToggle.addEventListener('change', function() {
        autoOpen = this.checked;
        GM_setValue('commandPanelAutoOpen', autoOpen);
    });
    let isDragging = false;
    let dragOffsetX, dragOffsetY;
    panelHeader.addEventListener('mousedown', function(e) {
        isDragging = true;
        const rect = commandPanel.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
    });
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const x = Math.max(0, Math.min(e.clientX - dragOffsetX, window.innerWidth - commandPanel.offsetWidth));
            const y = Math.max(0, Math.min(e.clientY - dragOffsetY, window.innerHeight - commandPanel.offsetHeight));
            commandPanel.style.left = x + 'px';
            commandPanel.style.top = y + 'px';
            commandPanel.style.transform = 'none';
            panelPosition = { left: x + 'px', top: y + 'px' };
            GM_setValue('commandPanelPosition', panelPosition);
        }
    });
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    if (nickname) {
        updatePrompt();
    }
    updateBrowserInfo();
    const savedBackgroundImage = GM_getValue('commandPanelBackgroundImage', '');
    if (savedBackgroundImage) {
        setBackgroundImage(savedBackgroundImage);
    }
    if (autoOpen) {
        panel.style.display = 'block';
        if (!nickname) {
            showNicknamePrompt();
        }
        updateBrowserInfo();
    }
    const transparencySlider = document.getElementById('transparency-slider');
    transparencySlider.addEventListener('input', function() {
        const opacity = this.value / 100;
        document.getElementById('command-panel-background').style.backgroundColor = `rgba(12, 12, 12, ${opacity})`;
    });

    function clearExcludedSites() {
        GM_setValue('commandPanelExcludedSites', JSON.stringify([]));
        excludedSites = [];
        console.log('The list of excluded sites has been cleared //sorry for this bug');
    }
    unsafeWindow.clearexcludedsites = clearExcludedSites;
    commandInput.setAttribute('autocomplete', 'off');
    function updateInterface() {
            const lang = GM_getValue('commandPanelLanguage', 'english');
            const t = translations[lang];

            document.getElementById('command-panel-title').textContent = t.commandPrompt;
            document.querySelector('#settings-header span:nth-child(2)').textContent = t.settings;
            document.querySelector('#settings-content p:nth-of-type(1)').textContent = t.changeNickname;
            document.getElementById('save-nickname').textContent = t.save;
            document.querySelector('#settings-content p:nth-of-type(2)').textContent = t.selectBackground;
            document.getElementById('reset-background').textContent = t.reset;
            document.querySelector('#settings-content p:nth-of-type(3)').textContent = t.excludeSites;
            document.getElementById('save-exclusions').textContent = t.saveExclusions;
            document.querySelector('#settings-content p:nth-of-type(4)').textContent = t.autoOpen;
            document.querySelector('#settings-content p:nth-of-type(5)').textContent = t.transparency;
            document.querySelector('#nickname-prompt p').textContent = t.enterNickname;
            document.getElementById('nickname-submit').textContent = 'OK';

            updateBrowserInfo();

            for (let cmd in commands) {
                if (commands[cmd].descriptionKey) {
                    commands[cmd].description = t[commands[cmd].descriptionKey];
                }
            }
        }
    const savedLanguage = GM_getValue('commandPanelLanguage', 'english');
    updateInterface();

    function setLanguage(lang) {
        GM_setValue('commandPanelLanguage', lang);
        updateInterface();
    }
    function applyDarkModeOnLoad() {
        const darkModeUrls = GM_getValue('darkModeUrls', []);
        const currentUrl = window.location.hostname;

        if (darkModeUrls.includes(currentUrl)) {
            const style = document.createElement('style');
            style.id = 'darkModeStyle';
            style.textContent = `
                body, body * {
                    background-color: #1a1a1a !important;
                    color: #e0e0e0 !important;
                    border-color: #333 !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    applyDarkModeOnLoad();

    function handleClearWhitelist(args) {
        const lang = GM_getValue('commandPanelLanguage', 'english');
        const t = translations[lang];
        const url = window.location.href;

        if (!url.startsWith('https://store.steampowered.com/wishlist/id/')) {
            commandOutput.innerHTML += `<p>${t.steamWishlistError}</p>`;
            return;
        }

        let interval = 1000;
        if (args.length > 0 && !isNaN(args[0])) {
            interval = parseInt(args[0]);
        }

        if (args.includes('stop')) {
            if (window.clearWhitelistInterval) {
                clearInterval(window.clearWhitelistInterval);
                window.clearWhitelistInterval = null;
                commandOutput.innerHTML += `<p>${t.steamClearingStopped}</p>`;
            } else {
                commandOutput.innerHTML += `<p>${t.steamNoActiveClearing}</p>`;
            }
            return;
        }

        function removeGames() {
            const buttons = document.querySelectorAll('button.nK8lTB5HZ5o-.Focusable');
            buttons.forEach(button => button.click());
            }
            if (window.clearWhitelistInterval) {
                clearInterval(window.clearWhitelistInterval);
            }
            window.clearWhitelistInterval = setInterval(removeGames, interval);
            removeGames();
            commandOutput.innerHTML += `<p>${t.steamClearingStarted.replace('{interval}', interval)}</p>`;
        }

        function handleMonthlyIncome(months = 1) {
        const lang = GM_getValue('commandPanelLanguage', 'english');
        const t = translations[lang];

        if (window.location.href !== 'https://store.steampowered.com/account/history/') {
            commandOutput.innerHTML += `<p>${t.steamIncomeError}</p>`;
            return;
        }

        const table = document.querySelector('table.wallet_history_table');
        if (!table) {
            commandOutput.innerHTML += `<p>${t.steamNoHistoryError} (Table not found)</p>`;
            return;
        }

        const tbody = table.querySelector('tbody');
        if (!tbody) {
            commandOutput.innerHTML += `<p>${t.steamNoHistoryError} (tbody not found)</p>`;
            return;
        }

        const rows = Array.from(tbody.querySelectorAll('tr'));
        let startBalance = null;
        let endBalance = null;
        let startDate = null;
        let endDate = null;
        let currency = '';

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const dateCell = row.querySelector('td.wht_date');
            const balanceCell = row.querySelector('td.wht_wallet_balance');

            if (!dateCell || !balanceCell) continue;

            const date = new Date(dateCell.textContent.trim());
            if (isNaN(date.getTime())) continue;

            const balanceText = balanceCell.textContent.trim();
            const balanceMatch = balanceText.match(/([0-9.,]+)\s*([^\s]+)/);
            if (!balanceMatch) continue;

            const balance = parseFloat(balanceMatch[1].replace(',', '.'));
            currency = balanceMatch[2];

            if (endDate === null) {
                endDate = date;
                endBalance = balance;
            }

            if (startDate === null || date < startDate) {
                startDate = date;
                startBalance = balance;
            }

            if (differenceInMonths(endDate, date) >= months) {
                break;
            }
        }

        if (startBalance !== null && endBalance !== null) {
            if (differenceInMonths(endDate, startDate) < months) {
                commandOutput.innerHTML += `<p>${t.steamNoHistoryError} (Not enough history for ${months} month(s))</p>`;
            } else {
                const income = endBalance - startBalance;
                if (income >= 0) {
                    commandOutput.innerHTML += `<p>${t.steamIncomeResult.replace('{months}', months).replace('{income}', income.toFixed(2)).replace('{currency}', currency)}</p>`;
                } else {
                    const lossAmount = Math.abs(income);
                    commandOutput.innerHTML += `<p>${t.steamIncomeLoss.replace('{months}', months).replace('{loss}', lossAmount.toFixed(2)).replace('{currency}', currency)}</p>`;
                }
            }
        } else {
            commandOutput.innerHTML += `<p>${t.steamIncomeFetchError}</p>`;
        }
    }

    function differenceInMonths(date1, date2) {
        let months;
        months = (date1.getFullYear() - date2.getFullYear()) * 12;
        months -= date2.getMonth();
        months += date1.getMonth();
        return months <= 0 ? 0 : months;
    }
})();
