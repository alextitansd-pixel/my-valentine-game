app/
├── [shareKey]/
│   ├── page.js                    ← 密碼輸入頁
│   └── [gameKey]/
│       └── page.js                ← 真正遊戲頁（大心心 + 煙花）
├── api/
│   ├── store/route.js             ← 出單 API（自動產生雙 key）
│   └── get/route.js               ← 讀資料 + 驗證密碼
└── components/
    ├── PasswordForm.jsx           ← 密碼表單
    └── Game.jsx                   ← 遊戲主體（你原本的煙花程式）
