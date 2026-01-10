# API 說明

Base URL：`http://localhost:4000`

- 認證：JWT Bearer Token，需驗證的路由在 Header 加 `Authorization: Bearer <token>`。
- 回應格式：JSON。錯誤格式 `{ "message": string }`，常見狀態碼 400/401/404/409/500。
- 上傳：`multipart/form-data`，欄位名 `image`，僅 1 張、<= 3MB，支援 jpg/png/webp。

## Auth

### POST /api/auth/register

- Body：
  ```json
  { "username": "string", "email": "string", "password": "string" }
  ```
  - `username` 最少 2 字；`password` 最少 6 字
- 成功 201：
  ```json
  { "id": "string" }
  ```

### POST /api/auth/login

- Body：
  ```json
  { "email": "string", "password": "string" }
  ```
- 成功 200：
  ```json
  {
    "token": "<JWT>",
    "user": { "id": "string", "username": "string", "email": "string" }
  }
  ```

## Meals（需 Bearer Token）

### GET /api/meals

- Query：`date=YYYY-MM-DD`（可選，指定日期）
- 成功 200：`Meal[]`
  ```json
  [
    {
      "_id": "id",
      "title": "Salad",
      "mealType": "Lunch",
      "date": "2024-01-01T00:00:00.000Z",
      "imageUrl": "/uploads/xxx.jpg",
      "description": "Light lunch",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

### GET /api/meals/:id

- Params：`id`（Mongo ObjectId）
- 成功 200：`Meal`

### POST /api/meals

- Content-Type：`multipart/form-data`
- Form-Data 欄位：
  - `title` (string, 必填)
  - `mealType` (Breakfast | Lunch | Dinner, 必填)
  - `date` (YYYY-MM-DD，可選，預設今天，不可未來)
  - `description` (string, 選填，<= 100 字)
  - `image` (file, 選填，jpg/png/webp, <= 3MB)
- 成功 201：建立後的 `Meal`

### PUT /api/meals/:id

- Content-Type：`multipart/form-data`
- Params：`id`
- Form-Data（與 POST 相同）並新增：
  - `removeImage` = "true" | "false"（預設 false），true 會移除現有圖片
- 規則：若上傳新圖，舊圖會被刪除。
- 成功 200：更新後的 `Meal`

### DELETE /api/meals/:id

- Params：`id`
- 成功 200：`{ "ok": true }`

## 健康檢查

- GET /health：服務存活檢查
- GET /health/db：
  ```json
  { "ok": true, "db": "connected" }
  ```

## Meal 物件格式

```json
{
  "_id": "string",
  "userId": "string",
  "title": "string",
  "mealType": "Breakfast" | "Lunch" | "Dinner",
  "date": "2024-01-01T00:00:00.000Z",
  "imageUrl": "string",
  "description": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```
