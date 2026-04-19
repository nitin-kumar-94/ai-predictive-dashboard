# 🎯 Quick Reference Guide

## Start Project in 30 Seconds

### Option 1: Windows Batch File (One Click!)
```bash
start.bat
```
Two console windows will open automatically. Wait 5 seconds, then visit: **http://localhost:3000**

### Option 2: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Then open browser: **http://localhost:3000**

---

## 🧪 Test with cURL

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Sample Query
```bash
curl -X POST http://localhost:5000/api/query/natural-language \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"Show me total revenue for electronics in Q3\"}"
```

### Expected Result
- Confidence: 92%
- Records: 4 products
- Revenue: $6,697
- Chart Type: Line

---

## 📝 Try These Queries in the UI

1. **"Show me total revenue for electronics in Q3"** → Line Chart
2. **"What is the average price across all furniture?"** → Bar Chart
3. **"Count how many laptop units were sold"** → Count Aggregation
4. **"Show me revenue trends across quarters"** → Trend Analysis

---

## 📂 Key Files

| File | Purpose | Status |
|------|---------|--------|
| `start.bat` | Quick launcher | ✅ Ready |
| `backend/server.js` | Express API | ✅ Ready |
| `backend/aiQueryInterpreter.js` | Demo Mode AI | ✅ Demo Active |
| `backend/dataAggregator.js` | Data Processing | ✅ Ready |
| `frontend/src/App.jsx` | React Main | ✅ Ready |
| `README.md` | Full Documentation | ✅ Complete |
| `RUNNING.md` | Testing Guide | ✅ Complete |
| `SETUP_GUIDE.md` | Installation | ✅ Complete |
| `COMPLETION_REPORT.md` | Project Report | ✅ Complete |

---

## 🔧 Configuration

**Backend/.env (Already Set)**
```
PORT=5000
ANTHROPIC_API_KEY=sk-ant-v0-test... (Demo Mode Active)
NODE_ENV=development
CACHE_TTL=3600
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## ✨ Features Included

✅ Natural Language Query Interpretation  
✅ 4 Dynamic Chart Types (Line, Bar, Pie, Scatter)  
✅ Confidence Scoring (Color-Coded)  
✅ Query Caching (MD5-based)  
✅ Rate Limiting (100 req/60s)  
✅ Demo Mode (Works without real API)  
✅ Responsive Mobile Design  
✅ Loading Animations  
✅ Error Handling  
✅ Executive Summaries  

---

## 🚨 Troubleshooting

**Port Already in Use?**
Edit `backend/.env`: `PORT=5001`

**Module Not Found?**
```bash
cd backend && npm install
cd ../frontend && npm install
```

**No Chart Shows?**
Try simpler query: "revenue electronics" or "count laptops"

---

## 📊 Demo Data

- **20 Products** across 2 categories
- **4 Quarters** (Q1-Q4 2024)
- **Electronics:** Laptop, Monitor, Keyboard, Mouse
- **Furniture:** Desk Chair, Desk, Lamp
- **Price Range:** $49-$999
- **Instant Processing:** <100ms

---

## 🎯 What's Different

This implementation includes:
- ✅ **Demo Mode**: Works instantly without Anthropic API key
- ✅ **Mock Data**: Realistic pattern-based query interpretation
- ✅ **Full Stack**: Both frontend and backend complete
- ✅ **Production Ready**: Clean code, error handling, documentation

---

## 📍 Access Points

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000/api | 5000 |
| Health Check | http://localhost:5000/api/health | 5000 |

---

## 🎓 Learn More

- **Architecture:** See `README.md`
- **Setup Instructions:** See `SETUP_GUIDE.md`
- **Testing Guide:** See `RUNNING.md`
- **Project Report:** See `COMPLETION_REPORT.md`

---

## ✅ Verification Checklist

- [x] Backend modules tested (Demo mode ACTIVE)
- [x] Node.js v16.20.2 confirmed working
- [x] Database with 20 products loaded
- [x] Cache module initialized
- [x] Rate limiter ready
- [x] Frontend dependencies installed
- [x] All React components created
- [x] CSS styling complete
- [x] Documentation complete
- [x] Project ready to run

---

## 🚀 Start Now!

```bash
# Navigate to project
cd d:\techTask

# Run one-click starter
start.bat

# Or manually start
cd backend && node server.js  # Terminal 1
cd frontend && npm start       # Terminal 2

# Open browser
# http://localhost:3000

# Try a query: "Show me total revenue for electronics in Q3"
```

**That's it! The dashboard is ready! 🎉**
