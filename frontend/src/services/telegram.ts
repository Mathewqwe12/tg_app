// Определяем тип для Telegram Web App
interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  onEvent: (eventType: string, callback: () => void) => void;
  offEvent: (eventType: string, callback: () => void) => void;
  sendData: (data: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  headerColor: string;
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code: string;
    };
    auth_date: number;
    hash: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

class TelegramService {
  private tg: TelegramWebApp;

  constructor() {
    // @ts-ignore - игнорируем ошибку типов для window.Telegram
    this.tg = window.Telegram.WebApp;
    this.init();
  }

  private init(): void {
    // Сообщаем Telegram, что приложение готово
    this.tg.ready();

    // Разворачиваем приложение на весь экран
    this.tg.expand();

    // Включаем подтверждение закрытия
    this.tg.enableClosingConfirmation();
  }

  public hapticImpact(style: 'light' | 'medium' | 'heavy'): void {
    this.tg.HapticFeedback.impactOccurred(style);
  }

  public hapticNotification(type: 'error' | 'success' | 'warning'): void {
    this.tg.HapticFeedback.notificationOccurred(type);
  }

  public hapticSelection(): void {
    this.tg.HapticFeedback.selectionChanged();
  }

  public showBackButton(callback: () => void): void {
    this.tg.BackButton.show();
    this.tg.BackButton.onClick(callback);
  }

  public hideBackButton(): void {
    this.tg.BackButton.hide();
  }

  public showMainButton(text: string, callback: () => void): void {
    this.tg.MainButton.text = text;
    this.tg.MainButton.onClick(callback);
    this.tg.MainButton.show();
  }

  public hideMainButton(): void {
    this.tg.MainButton.hide();
  }

  public close(): void {
    this.tg.close();
  }
}

// Экспортируем единственный экземпляр сервиса
export const telegram = new TelegramService(); 