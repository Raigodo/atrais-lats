-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoCoin" (
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "percentChange" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CryptoCoin_pkey" PRIMARY KEY ("symbol")
);

-- CreateTable
CREATE TABLE "FavoriteCryptoCoin" (
    "symbol" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FavoriteCryptoCoin_pkey" PRIMARY KEY ("symbol","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FavoriteCryptoCoin" ADD CONSTRAINT "FavoriteCryptoCoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
