# Photo Studio Website

Веб-сайт візитівка для фотостудії з можливістю бронювання.

## Технології

- Frontend: React.js
- Backend: Express.js
- Database: MySQL

## Конфігурація

## 🛠️ Технології

- **Frontend**: React.js , Typescript
- **Backend**: Node.js (Express.js)
- **База даних**: MySQL
- **Документація**: Docusaurus
- **UI-документація**: Storybook
- **Тестування API**: Postman
- **Cookie-попап**: react-cookie-consent
-

### Frontend

cd frontend
npm install
npm run dev

### Backend

cd backend
npm install
npm run dev

## Ліцензія

[Дивитися LICENSE](LICENSE)

## Privacy Policy

[privacy-policy.md](privacy-policy.md)

## Генерація документації

Docusaurus
cd docs
npm run start

## Storybook
Описано 2 компоненти (Header, SecondHeader)
cd frontend
npm run storybook

## Postman
Swagger не використовується. API протестовано через Postman.
Колекція розташована за посиланням:

📁 [Postman collection](../../backend/photo-studio-api.postman_collection.json)

Описано мінімально необхідні виклики:

POST /api/contact — контактна форма

POST /api/booking — створення бронювання

## Автор

Чебера Вікторія
