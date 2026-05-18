# React Native Template

Современный стартовый шаблон React Native с архитектурой Feature-Sliced Design и актуальным стеком.

## Стек

| Слой | Технология |
|---|---|
| Фреймворк | React Native 0.85 + TypeScript |
| Навигация | React Navigation 7 (Stack + Bottom Tabs) |
| Состояние (клиент) | Zustand |
| Состояние (сервер) | TanStack Query |
| HTTP | Axios |
| Хранилище | MMKV |
| Формы | React Hook Form + Zod |
| UI | NativeWind + собственный UI-kit |
| Анимации | Reanimated + Gesture Handler |
| Линтер/Форматтер | ESLint + Prettier |
| Тесты | Jest + RNTL |

## Архитектура

```
src/
├── app/          # Настройка приложения, провайдеры, корневой компонент
├── pages/        # Экраны (HomeScreen, ProfileScreen, etc.)
├── widgets/      # Композиционные блоки (Header, CardList, etc.)
├── features/     # Пользовательские сценарии (auth, search, etc.)
├── entities/     # Бизнес-сущности (User, Product)
└── shared/       # UI-kit, хуки, API-клиент, lib, типы, конфиг
```

Направление зависимостей: `app → pages → widgets → features → entities → shared`

## Требования

- Node.js >= 22.11.0
- Android Studio & Android SDK (для Android)
- Xcode 16+ (для iOS)
- CocoaPods (для iOS)

## Быстрый старт

```bash
# Установить зависимости
npm install

# iOS — установить Pods
cd ios && pod install && cd ..

# Запустить Metro
npm start

# Запустить на Android
npm run android

# Запустить на iOS
npm run ios
```

## Скрипты

| Скрипт | Описание |
|---|---|
| `npm start` | Запуск Metro bundler |
| `npm run android` | Dev-сборка на Android |
| `npm run android:release` | Релизная APK на устройство |
| `npm run ios` | Dev-сборка на iOS симулятор |
| `npm run ios:release` | Релиз на iOS симулятор |
| `npm run lint` | Проверка линтером |
| `npm run lint:fix` | Автоисправление lint ошибок |
| `npm run format` | Форматирование Prettier |
| `npm run typecheck` | Проверка TypeScript |
| `npm run test` | Запуск тестов |

## Сборка APK (Android)

```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

## Сборка IPA (iOS)

```bash
cd ios
pod install
# Открыть ReactNativeTemplate.xcworkspace в Xcode
# Product → Archive → Distribute App
```

## Конвенции проекта

- **Feature-Sliced Design** — код лежит в своём слое, импорты только сверху вниз
- **UI-kit** — переиспользуемые компоненты в `shared/ui/`
- **Zustand store** — стор на сущность в `entities/*/store.ts`
- **API** — через Axios-клиент в `shared/api/http-client.ts`
- **React Query** — для всех серверных данных (queries + mutations)
- **Тема** — контекст с light/dark в `shared/lib/theme.tsx`
