# Crons
Application uses crons to periodically clean-up pending data. Every cron script can be found
under `/bin` directory and is executed with:
```
ts-node -r tsconfig-paths/register .\bin\<cron script>.ts
```

Following crons are active, for information about their frequencies head to the
appropriate crontable:
 - **Uploads folder clean-up** - Removes files of deleted accounts from fs.
 - **Activity table clean-up** - Removes activies that were seen before 1 week or more, and not-seen activities older than a month.

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[API](./api.md)</sup>  | <sup>[Modules](./modules.md)</sup> |
