prisma の設定

```shell
npx prisma init
npx prisma db push
npx prisma migrate dev

```

マイグレーションファイルの追加

```shell
npx prisma migrate dev

# 編集の場合(edit、deleteではなくadd)
npx prisma migrate dev --create-only

# 確認
# → 情報を追加しておく{"email":"test@test.com","name":"田中太郎","password":"1"}
npx prisma studio

```
