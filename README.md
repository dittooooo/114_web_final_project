# 飲食紀錄

以 React + Express + MongoDB 打造的飲食紀錄服務，前後端分離，支援登入、建立/瀏覽/編輯/刪除飲食紀錄與圖片上傳，介面支援 RWD。

## 系統架構

- 前端：React (Vite) SPA，呼叫後端 REST API。
- 後端：Express 提供 Auth/Meals API，Multer 處理圖片，上傳檔案提供靜態服務。
- 資料庫：MongoDB（可用 docker-compose 啟動）。

## 技術堆疊

- frontend：React, react-router-dom, Axios, Vite, ESLint
- backend：Node.js, Express, Mongoose, Multer, JSON Web Token, dotenv, cors
- infra：MongoDB 7, Docker / Docker Compose

## 環境需求

- Node.js 18+、npm
- Docker + Docker Compose（用來啟動 MongoDB；如已有 Mongo，可跳過）

## 專案結構

```bash
114_web_final_project/
├── backend/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   └── mongo-init.js
│   └── server/
│       ├── app.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── authController.js
│       │   └── mealController.js
│       ├── middlewares/
│       │   ├── auth.js
│       │   └── errorHandler.js
│       ├── models/
│       │   ├── Meal.js
│       │   └── User.js
│       ├── repositories/
│       │   ├── mealRepository.js
│       │   └── userRepository.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   └── mealRoutes.js
│       ├── services/
│       │   ├── authService.js
│       │   └── mealService.js
│       ├── utils/
│       │   └── validators.js
│       ├── uploads/
│       ├── package.json
│       └── .env
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/http.js
│       ├── components/
│       ├── contexts/AuthContext.jsx
│       ├── pages/
│       ├── App.jsx
│       ├── index.css
│       ├── App.css
│       └── main.jsx
├── docs/
└── README.md
```

## 環境變數

後端 `backend/server/.env`

```bash
PORT=4000
MONGO_URI=mongodb://root:rootpass@localhost:27017/webfinal?authSource=admin
FRONTEND_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret
```

前端 `frontend/.env`

```bash
VITE_API_BASE_URL=http://localhost:4000
```

## 快速開始

1. 啟動 Mongo（使用 docker-compose）

```bash
cd backend/docker
docker compose up -d
```

2. 啟動後端

```bash
cd backend/server
npm install
npm run dev      # 或 npm start（production）
# 服務預設 http://localhost:4000
```

3. 啟動前端

```bash
cd frontend
npm install
npm run dev      # 預設 http://localhost:5173
```

## 可用指令

- backend：`npm run dev`（開發 hot reload），`npm start`（正式）
- frontend：`npm run dev`、`npm run build`、`npm run preview`、`npm run lint`

## API 文件

完整端點說明請見 [docs/API.md](docs/API.md)。

## 功能特色概要

### 一、管理飲食紀錄

**1. 新增飲食紀錄:**

基本欄位

- 料理名稱 (必填)
- 餐別（早餐 / 午餐 / 晚餐）
- 日期（預設今天）
- 照片（選填，最多 1 張）
- 簡短描述（選填，不超過 100 字）

備註

- 不可選擇未來日期
- 表單上傳前，前端先做初步驗證和錯誤提示。
- 上傳成功後顯示提示並跳轉至首頁。

**2. 修改飲食紀錄:**

- 點擊以上傳的飲食紀錄後即可修改該筆紀錄，每個欄位皆可更動，選填內容可為直接刪除。
- 儲存後確認必填欄位皆有填寫即可上傳，成功上傳後顯示提示並跳轉至首頁。

**3. 刪除飲食紀錄:**

- 刪除前跳出確認視窗
- 刪除後顯示提示並跳轉至首頁。

### 二、瀏覽飲食紀錄 (預設首頁)

**1. 飲食紀錄完整列表:**

- 顯示所有飲食紀錄
- 依照日期排序 (新到舊)
- 每筆顯示: 日期、餐別、料理名稱、縮圖

**2. 依日期查詢:**

- 瀏覽飲食紀錄頁面上可點選日期，去顯示特定日期的紀錄。
- 為選日期預設顯示全部記錄
- 查詢日期無紀錄資料，顯示「當日尚無紀錄」

**3. 飲食紀錄詳細資料:**

- 點擊紀錄可看到詳細資料(簡短描述)和編輯、刪除按鈕

### 三、使用者系統

**1. 註冊/登入:**

- 註冊需輸入: 使用者名稱、Email、密碼。
- 註冊完後跳轉至登入頁面。
- 登入後取得 token
- token 存在 localStorage
- 登出後清除 token

**2. 權限:**

- 未登入: 只能看到首頁、登入、註冊頁面。
- 已登入: 能看到首頁、上傳瀏覽/編輯/刪除飲食紀錄。
- 每個使用者只能看到自己的飲食紀錄。
