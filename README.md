# Atrais-Last (Next.js)

Simple Next.js app to track favorite cryptocurrencies  
and get email alerts when price goes outside your set range.

Rewritten solo version of a university group project  
(better architecture, cleaner code, still half-baked).

Status:  
- Kind of works  
- Very rough / unfinished  
- For personal use & learning

Features (what's actually there):  
- Add coins you care about  
- Set min/max price borders per coin  
- Email notifications on breach (via your provider)

Not production-ready.  
Just a nicer take on the old group mess.


## Getting Started

```bash
npm i
npx prisma migrate dev
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
