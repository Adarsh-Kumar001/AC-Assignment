# 🏥 OpenMic Medical Intake Assistant

An AI-powered **medical intake assistant** that handles patient calls, transcribes call and saves call transcripts for later reference.  
Built with **Next.js**, **TailwindCSS**, **TypeScript**, and **OpenMic API**.

---


## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [TailwindCSS](https://tailwindcss.com/)  
- **Backend**: Next.js API Routes  
- **AI**: OpenMic API   
- **Other Tools**: [ngrok](https://ngrok.com/) for exposing localhost  

---

### Set up environment variables

Create a .env file in the root with:

NEXT_PUBLIC_OPENMAP_API_KEY= #the api key




---

### To Use

- Start the server (npm run dev).
- Run ngrok to expose your local API: ngrok http 3000
- Copy the ngrok URL into openmic's agents pre, post call and custom function
- Open the app in your browser. localhost:3000
- Initiate a call with the assistant in OpenMic's dashboard, talk to it then view the transcript in the Calls section in site.

---



