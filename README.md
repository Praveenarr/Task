# Segment Builder - React + Vite

A React + Vite application to create custom segments with dynamic schemas and send them to a webhook for testing. Built with Tailwind CSS and Axios.

---

## Tech Stack

- React 19.x
- Vite 7.x
- Tailwind CSS 4.x
- Axios
- Lucide Icons

---

### Prerequisites

- Node.js >= 18
- npm >= 9

## Features

- Create a segment with a name.
- Dynamically add multiple schemas to a segment.
- Prevent duplicate schema selection.
- Remove added schemas.
- Send segment data to a webhook endpoint (JSON payload).
- Tailwind styling with responsive UI.
- Modal popup for segment creation.

---

## Project Flow

1. Click **“Save Segment”** button to open the popup.
2. Enter a **segment name**.
3. Add schemas from the dropdown to the blue box:
   - Dropdown resets after adding a schema.
   - Already selected schemas are removed from available options.
4. Click **“Save Segment”** to send data to the webhook.
5. JSON payload format:

```json
{
  "segment_name": "example_segment",
  "schema": [{ "first_name": "First Name" }, { "last_name": "Last Name" }]
}
```

### Clone Repository

```bash
git clone https://github.com/Praveenarr/customer-labs.git
cd segment-builder
npm i
npm run dev
```
