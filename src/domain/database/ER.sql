CREATE TABLE "User" (
  "id" integer,
  "name" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE "Message" (
  "id" integer,
  "text" varchar,
  "created_at" timestamp
);

CREATE TABLE "Room" (
  "id" integer,
  "name" varchar,
  "created_at" timestamp
);

CREATE TABLE "Room_User" (
  "user_id" integer,
  "room_id" integer
);

CREATE TABLE "User_Message" (
  "id" integer,
  "user_id" integer,
  "message_id" integer
);

ALTER TABLE "User_Message" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "User_Message" ADD FOREIGN KEY ("message_id") REFERENCES "Message" ("id");

ALTER TABLE "Room_User" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Room_User" ADD FOREIGN KEY ("room_id") REFERENCES "Room" ("id");
