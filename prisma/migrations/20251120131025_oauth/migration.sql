-- CreateTable
CREATE TABLE "OAuthUsers" (
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OAuthUsers_pkey" PRIMARY KEY ("provider","providerUserId")
);

-- AddForeignKey
ALTER TABLE "OAuthUsers" ADD CONSTRAINT "OAuthUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
