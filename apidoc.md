# 🔍 Fake News Detector — API Documentation

**Project:** Fake News Detector using NLP & Machine Learning  
**Author:** Muhammad Afnan (001299057)  
**Deployed at:** `https://afnanazhar-fake-news-detector.hf.space`


---

## 📌 Base URL

```
https://afnanazhar-fake-news-detector.hf.space
```

All endpoints are relative to this base URL. The API accepts and returns **JSON**.

---

## 🔗 Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Check if API and models are running |
| `GET` | `/models` | List all available models and their accuracy |
| `POST` | `/predict` | Classify an article with a single model |
| `POST` | `/predict/all` | Run all 6 models and compare results |
| `POST` | `/explain` | Get LIME word-level explanation (BiLSTM) |

---

## 1. `GET /health`

Check that the server is up and all models are loaded.

**Request:**
```
GET https://afnanazhar-fake-news-detector.hf.space/health
```

**Response:**
```json
{
  "status": "ok",
  "models_ready": true,
  "models_loaded": ["logistic", "naive_bayes", "random_forest", "svm", "lstm", "bilstm"]
}
```

**Use this to:** Check connectivity before making predictions. If `models_ready` is `false`, wait a few seconds and retry — models are still loading.

---

## 2. `GET /models`

Returns metadata for all available models.

**Request:**
```
GET https://afnanazhar-fake-news-detector.hf.space/models
```

**Response:**
```json
{
  "models": {
    "logistic":      { "type": "Classical ML",  "accuracy": 0.9876 },
    "naive_bayes":   { "type": "Classical ML",  "accuracy": 0.9434 },
    "random_forest": { "type": "Classical ML",  "accuracy": 0.9916 },
    "svm":           { "type": "Classical ML",  "accuracy": 0.9940 },
    "lstm":          { "type": "Deep Learning", "accuracy": 0.9975 },
    "bilstm":        { "type": "Deep Learning", "accuracy": 0.9990 }
  },
  "best": "bilstm",
  "default": "bilstm"
}
```

---

## 3. `POST /predict`

Classify a news article using a single model of your choice.

**Request:**
```
POST https://afnanazhar-fake-news-detector.hf.space/predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Your news article text goes here...",
  "model": "bilstm"
}
```

| Field | Type | Required | Default | Options |
|-------|------|----------|---------|---------|
| `text` | string | ✅ Yes | — | Any article text |
| `model` | string | ❌ No | `bilstm` | `logistic` `naive_bayes` `random_forest` `svm` `lstm` `bilstm` |

**Response:**
```json
{
  "prediction": "FAKE",
  "confidence": 0.9823,
  "confidence_pct": "98.23%",
  "model_used": "bilstm",
  "word_count": 87,
  "response_ms": 142.3,
  "status": "success"
}
```

| Field | Description |
|-------|-------------|
| `prediction` | `"REAL"` or `"FAKE"` |
| `confidence` | Float 0–1. Probability of predicted class |
| `confidence_pct` | Human-readable confidence string |
| `model_used` | Which model was used |
| `word_count` | Number of words in input |
| `response_ms` | Server-side inference time in milliseconds |

---

## 4. `POST /predict/all`

Run all 6 models simultaneously and get a comparison + majority vote.

**Request:**
```
POST https://afnanazhar-fake-news-detector.hf.space/predict/all
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Your news article text goes here..."
}
```

**Response:**
```json
{
  "results": {
    "logistic":      { "prediction": "FAKE", "confidence": 0.9712, "confidence_pct": "97.12%" },
    "naive_bayes":   { "prediction": "FAKE", "confidence": 0.9341, "confidence_pct": "93.41%" },
    "random_forest": { "prediction": "FAKE", "confidence": 0.9891, "confidence_pct": "98.91%" },
    "svm":           { "prediction": "FAKE", "confidence": 0.9654, "confidence_pct": "96.54%" },
    "lstm":          { "prediction": "FAKE", "confidence": 0.9934, "confidence_pct": "99.34%" },
    "bilstm":        { "prediction": "FAKE", "confidence": 0.9978, "confidence_pct": "99.78%" }
  },
  "majority_vote": "FAKE",
  "votes": { "REAL": 0, "FAKE": 6 },
  "bilstm_verdict": "FAKE",
  "word_count": 87,
  "response_ms": 834.1,
  "status": "success"
}
```

---

## 5. `POST /explain`

Get a LIME explanation showing which words most influenced the prediction.  
Uses **BiLSTM** as the explained model (best accuracy).

**Request:**
```
POST https://afnanazhar-fake-news-detector.hf.space/explain
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Your news article text goes here...",
  "num_features": 10,
  "num_samples": 100
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `text` | string | ✅ Yes | — | Article text |
| `num_features` | int | ❌ No | `10` | Number of top words to return |
| `num_samples` | int | ❌ No | `100` | LIME perturbation samples (higher = more accurate but slower) |

**Response:**
```json
{
  "prediction": "FAKE",
  "confidence": 0.9978,
  "features": [
    { "word": "whistleblower", "weight": -0.184200, "direction": "FAKE" },
    { "word": "suppressed",    "weight": -0.142300, "direction": "FAKE" },
    { "word": "share",         "weight": -0.098100, "direction": "FAKE" },
    { "word": "confirmed",     "weight":  0.043200, "direction": "REAL" },
    { "word": "scientists",    "weight":  0.021100, "direction": "REAL" }
  ],
  "model_used": "bilstm",
  "response_ms": 4821.4,
  "status": "success"
}
```

| Field | Description |
|-------|-------------|
| `word` | The token that influenced the prediction |
| `weight` | Negative = pushes toward FAKE, Positive = pushes toward REAL |
| `direction` | `"REAL"` or `"FAKE"` — which class this word supports |

> ⚠️ `/explain` is slower than `/predict` — typically 3–8 seconds depending on `num_samples`.

---

## 💻 Code Examples

### JavaScript / React (fetch)

```javascript
// Single prediction
const predictArticle = async (text, model = 'bilstm') => {
  const response = await fetch(
    'https://afnanazhar-fake-news-detector.hf.space/predict',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model })
    }
  );
  const data = await response.json();
  console.log(data.prediction);     // "REAL" or "FAKE"
  console.log(data.confidence_pct); // "98.23%"
  return data;
};

// Compare all models
const compareAll = async (text) => {
  const response = await fetch(
    'https://afnanazhar-fake-news-detector.hf.space/predict/all',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }
  );
  return await response.json();
};

// Get LIME explanation
const explainPrediction = async (text) => {
  const response = await fetch(
    'https://afnanazhar-fake-news-detector.hf.space/explain',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, num_features: 10 })
    }
  );
  return await response.json();
};
```

### Python (requests)

```python
import requests

BASE_URL = "https://afnanazhar-fake-news-detector.hf.space"

# Single prediction
def predict(text, model="bilstm"):
    response = requests.post(
        f"{BASE_URL}/predict",
        json={"text": text, "model": model}
    )
    return response.json()

# Compare all models
def compare_all(text):
    response = requests.post(
        f"{BASE_URL}/predict/all",
        json={"text": text}
    )
    return response.json()

# LIME explanation
def explain(text, num_features=10):
    response = requests.post(
        f"{BASE_URL}/explain",
        json={"text": text, "num_features": num_features}
    )
    return response.json()

# Example usage
result = predict("BREAKING: Scientists confirm moon landing was staged...")
print(result["prediction"])     # FAKE
print(result["confidence_pct"]) # 99.12%
```

### cURL (terminal)

```bash
# Health check
curl https://afnanazhar-fake-news-detector.hf.space/health

# Single prediction
curl -X POST https://afnanazhar-fake-news-detector.hf.space/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Your article here...", "model": "bilstm"}'

# Compare all models
curl -X POST https://afnanazhar-fake-news-detector.hf.space/predict/all \
  -H "Content-Type: application/json" \
  -d '{"text": "Your article here..."}'

# Explain prediction
curl -X POST https://afnanazhar-fake-news-detector.hf.space/explain \
  -H "Content-Type: application/json" \
  -d '{"text": "Your article here...", "num_features": 10}'
```

---

## ❌ Error Responses

All errors return a JSON object with an `error` field.

| HTTP Code | Meaning | Example |
|-----------|---------|---------|
| `400` | Bad request — missing or invalid field | `{"error": "'text' field is required"}` |
| `400` | Invalid model name | `{"error": "Invalid model 'bert'", "valid": [...]}` |
| `503` | Models still loading | `{"error": "Models still loading, retry in a few seconds"}` |
| `404` | Endpoint not found | `{"error": "Endpoint not found"}` |
| `405` | Wrong HTTP method | `{"error": "Method not allowed"}` |
| `500` | Server error | `{"error": "Internal server error details..."}` |

---

## 🔒 Notes

- No authentication required — the API is public
- Text submitted is **not stored** — used only for real-time inference (GDPR compliant)
- Results are **probabilistic assessments**, not definitive judgments
- Confidence below 70% should be treated with caution

---

## 🗂️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Flask (Python) |
| ML Models | Scikit-learn + TensorFlow/Keras |
| NLP | NLTK (tokenisation, stopwords, lemmatisation) |
| Explainability | LIME |
| Deployment | Docker on Hugging Face Spaces |
| Frontend | HTML / CSS / JS (served by Flask) |
