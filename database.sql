-- to run this in a local environment setup your postgres database with the name 'chore-tracker'

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"password" varchar(1000) NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"is_parent" bool NOT NULL DEFAULT '1',
	"num_of_goals_completed" int DEFAULT '1',
	"family_id" int NOT NULL,
	"profile_img_url" TEXT NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "chore" (
	"id" serial NOT NULL,
	"description" TEXT NOT NULL,
	"val" serial NOT NULL,
	"family_id" int NOT NULL,
	CONSTRAINT "chore_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_chore" (
	"user_id" int NOT NULL,
	"chore_id" int NOT NULL,
	"is_active" bool NOT NULL DEFAULT 'true',
	"id" serial NOT NULL,
	"recurrence" varchar(24) NOT NULL,
	CONSTRAINT "user_chore_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "goal-prog" (
	"user_id" serial NOT NULL,
	"cumulative_val" int NOT NULL DEFAULT '100',
	"progress" int NOT NULL DEFAULT '0',
	"description" TEXT NOT NULL,
	CONSTRAINT "goal-prog_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "family" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "family_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "completed_chore" (
	"id" serial NOT NULL,
	"user_chore_id" bigint NOT NULL,
	"time_completed" TIMESTAMP NOT NULL,
	"img_url" TEXT,
	CONSTRAINT "completed_chore_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("family_id") REFERENCES "family"("id");

ALTER TABLE "chore" ADD CONSTRAINT "chore_fk0" FOREIGN KEY ("family_id") REFERENCES "family"("id");

ALTER TABLE "user_chore" ADD CONSTRAINT "user_chore_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_chore" ADD CONSTRAINT "user_chore_fk1" FOREIGN KEY ("chore_id") REFERENCES "chore"("id");

ALTER TABLE "goal-prog" ADD CONSTRAINT "goal-prog_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");


ALTER TABLE "completed_chore" ADD CONSTRAINT "completed_chore_fk0" FOREIGN KEY ("user_chore_id") REFERENCES "user_chore"("id");







