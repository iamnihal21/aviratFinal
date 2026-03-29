import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_college_achievements_color" AS ENUM('from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-yellow-500 to-orange-500', 'from-green-500 to-emerald-500', 'from-red-500 to-rose-500');
  CREATE TYPE "public"."enum_college_achievements_icon_type" AS ENUM('trophy', 'award', 'ranking', 'target', 'microscope');
  CREATE TYPE "public"."enum_student_achievements_category" AS ENUM('Technical', 'Cultural', 'Sports', 'Research');
  CREATE TYPE "public"."enum_gallery_category" AS ENUM('infrastructure', 'events', 'achievements');
  CREATE TYPE "public"."enum_gallery_span" AS ENUM('md:col-span-1', 'md:col-span-2', 'md:col-span-2 md:row-span-2');
  CREATE TYPE "public"."enum_events_category" AS ENUM('Academic', 'Cultural', 'Sports');
  CREATE TYPE "public"."enum_events_icon_type" AS ENUM('laptop', 'music', 'microscope', 'trophy', 'palette');
  CREATE TYPE "public"."enum_events_color" AS ENUM('from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-pink-500 to-rose-500');
  CREATE TYPE "public"."enum_research_areas_icon_type" AS ENUM('cpu', 'heart', 'leaf', 'rocket', 'zap', 'globe');
  CREATE TYPE "public"."enum_research_areas_color_theme" AS ENUM('from-blue-500 to-cyan-500', 'from-red-500 to-rose-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-indigo-500', 'from-amber-500 to-orange-500');
  CREATE TYPE "public"."enum_contact_contact_info_color" AS ENUM('from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500');
  CREATE TYPE "public"."enum_admissions_highlights_icon_type" AS ENUM('graduation', 'users', 'trophy', 'clock');
  CREATE TYPE "public"."enum_campus_settings_stats_icon_type" AS ENUM('users', 'dumbbell', 'heart', 'palette');
  CREATE TYPE "public"."enum_campus_settings_facilities_items_icon_type" AS ENUM('library', 'building', 'home', 'utensils', 'coffee', 'dumbbell', 'music', 'palette');
  CREATE TYPE "public"."enum_campus_settings_amenities_icon_type" AS ENUM('wifi', 'shield', 'wind', 'calendar', 'clock', 'star');
  CREATE TYPE "public"."enum_placements_settings_stats_icon_type" AS ENUM('trending', 'dollar', 'award', 'building');
  CREATE TYPE "public"."enum_placements_settings_highlights_icon_type" AS ENUM('award', 'briefcase', 'map-pin');
  CREATE TYPE "public"."enum_placements_settings_highlights_color_theme" AS ENUM('from-yellow-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500');
  CREATE TYPE "public"."enum_home_settings_stats_color" AS ENUM('from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "college_achievements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"color" "enum_college_achievements_color",
  	"icon_type" "enum_college_achievements_icon_type",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "student_achievements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"student_name" varchar NOT NULL,
  	"category" "enum_student_achievements_category",
  	"date" varchar,
  	"prize" varchar,
  	"color" varchar,
  	"icon_type" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"date" varchar,
  	"category" "enum_gallery_category" NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"span" "enum_gallery_span" DEFAULT 'md:col-span-1',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" "enum_events_category" NOT NULL,
  	"date" varchar NOT NULL,
  	"time" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"capacity" varchar,
  	"registration_deadline" varchar,
  	"icon_type" "enum_events_icon_type",
  	"color" "enum_events_color",
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "recruiters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"industry" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_type" "enum_research_areas_icon_type",
  	"color_theme" "enum_research_areas_color_theme",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faculty" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"specialty" varchar,
  	"image_id" integer NOT NULL,
  	"research_area_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"journal" varchar NOT NULL,
  	"publish_date" varchar,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"college_achievements_id" integer,
  	"student_achievements_id" integer,
  	"gallery_id" integer,
  	"events_id" integer,
  	"recruiters_id" integer,
  	"research_areas_id" integer,
  	"faculty_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_vision_mission_vision_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "about_vision_mission_mission_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "about_trustees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar,
  	"message" varchar,
  	"qualification" varchar,
  	"experience" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "about_faculty_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_year" varchar DEFAULT '1892',
  	"hero_description" varchar,
  	"vision_mission_vision_description" varchar,
  	"vision_mission_mission_description" varchar,
  	"faculty_description" varchar,
  	"faculty_additional" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_contact_info_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "contact_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"action" varchar,
  	"link" varchar,
  	"color" "enum_contact_contact_info_color"
  );
  
  CREATE TABLE "contact_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "admissions_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_type" "enum_admissions_highlights_icon_type"
  );
  
  CREATE TABLE "admissions_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar
  );
  
  CREATE TABLE "admissions_deadlines_undergraduate" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" varchar,
  	"deadline" varchar,
  	"notification" varchar
  );
  
  CREATE TABLE "admissions_deadlines_graduate" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" varchar,
  	"deadline" varchar,
  	"notification" varchar
  );
  
  CREATE TABLE "admissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "campus_settings_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"count" varchar,
  	"label" varchar,
  	"icon_type" "enum_campus_settings_stats_icon_type"
  );
  
  CREATE TABLE "campus_settings_facilities_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "campus_settings_facilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_type" "enum_campus_settings_facilities_items_icon_type"
  );
  
  CREATE TABLE "campus_settings_facilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "campus_settings_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"icon_type" "enum_campus_settings_amenities_icon_type"
  );
  
  CREATE TABLE "campus_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "placements_settings_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"icon_type" "enum_placements_settings_stats_icon_type"
  );
  
  CREATE TABLE "placements_settings_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"count" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_type" "enum_placements_settings_highlights_icon_type",
  	"color_theme" "enum_placements_settings_highlights_color_theme"
  );
  
  CREATE TABLE "placements_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_settings_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"highlight" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_settings_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"color" "enum_home_settings_stats_color"
  );
  
  CREATE TABLE "home_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sanskrit_quote" varchar,
  	"quote_translation" varchar,
  	"map_url" varchar,
  	"address" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faculty" ADD CONSTRAINT "faculty_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faculty" ADD CONSTRAINT "faculty_research_area_id_research_areas_id_fk" FOREIGN KEY ("research_area_id") REFERENCES "public"."research_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_college_achievements_fk" FOREIGN KEY ("college_achievements_id") REFERENCES "public"."college_achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_student_achievements_fk" FOREIGN KEY ("student_achievements_id") REFERENCES "public"."student_achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recruiters_fk" FOREIGN KEY ("recruiters_id") REFERENCES "public"."recruiters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_areas_fk" FOREIGN KEY ("research_areas_id") REFERENCES "public"."research_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faculty_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_vision_mission_vision_points" ADD CONSTRAINT "about_vision_mission_vision_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_vision_mission_mission_points" ADD CONSTRAINT "about_vision_mission_mission_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_trustees" ADD CONSTRAINT "about_trustees_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_trustees" ADD CONSTRAINT "about_trustees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_faculty_stats" ADD CONSTRAINT "about_faculty_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_contact_info_details" ADD CONSTRAINT "contact_contact_info_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_contact_info" ADD CONSTRAINT "contact_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_faqs" ADD CONSTRAINT "contact_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_highlights" ADD CONSTRAINT "admissions_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_timeline" ADD CONSTRAINT "admissions_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_deadlines_undergraduate" ADD CONSTRAINT "admissions_deadlines_undergraduate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_deadlines_graduate" ADD CONSTRAINT "admissions_deadlines_graduate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campus_settings_stats" ADD CONSTRAINT "campus_settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campus_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campus_settings_facilities_items_features" ADD CONSTRAINT "campus_settings_facilities_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campus_settings_facilities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campus_settings_facilities_items" ADD CONSTRAINT "campus_settings_facilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campus_settings_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campus_settings_facilities" ADD CONSTRAINT "campus_settings_facilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campus_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campus_settings_amenities" ADD CONSTRAINT "campus_settings_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campus_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "placements_settings_stats" ADD CONSTRAINT "placements_settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."placements_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "placements_settings_highlights" ADD CONSTRAINT "placements_settings_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."placements_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_slides" ADD CONSTRAINT "home_settings_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_settings_slides" ADD CONSTRAINT "home_settings_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_settings_stats" ADD CONSTRAINT "home_settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "college_achievements_updated_at_idx" ON "college_achievements" USING btree ("updated_at");
  CREATE INDEX "college_achievements_created_at_idx" ON "college_achievements" USING btree ("created_at");
  CREATE INDEX "student_achievements_updated_at_idx" ON "student_achievements" USING btree ("updated_at");
  CREATE INDEX "student_achievements_created_at_idx" ON "student_achievements" USING btree ("created_at");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "recruiters_logo_idx" ON "recruiters" USING btree ("logo_id");
  CREATE INDEX "recruiters_updated_at_idx" ON "recruiters" USING btree ("updated_at");
  CREATE INDEX "recruiters_created_at_idx" ON "recruiters" USING btree ("created_at");
  CREATE INDEX "research_areas_updated_at_idx" ON "research_areas" USING btree ("updated_at");
  CREATE INDEX "research_areas_created_at_idx" ON "research_areas" USING btree ("created_at");
  CREATE INDEX "faculty_image_idx" ON "faculty" USING btree ("image_id");
  CREATE INDEX "faculty_research_area_idx" ON "faculty" USING btree ("research_area_id");
  CREATE INDEX "faculty_updated_at_idx" ON "faculty" USING btree ("updated_at");
  CREATE INDEX "faculty_created_at_idx" ON "faculty" USING btree ("created_at");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_college_achievements_id_idx" ON "payload_locked_documents_rels" USING btree ("college_achievements_id");
  CREATE INDEX "payload_locked_documents_rels_student_achievements_id_idx" ON "payload_locked_documents_rels" USING btree ("student_achievements_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_recruiters_id_idx" ON "payload_locked_documents_rels" USING btree ("recruiters_id");
  CREATE INDEX "payload_locked_documents_rels_research_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("research_areas_id");
  CREATE INDEX "payload_locked_documents_rels_faculty_id_idx" ON "payload_locked_documents_rels" USING btree ("faculty_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "about_vision_mission_vision_points_order_idx" ON "about_vision_mission_vision_points" USING btree ("_order");
  CREATE INDEX "about_vision_mission_vision_points_parent_id_idx" ON "about_vision_mission_vision_points" USING btree ("_parent_id");
  CREATE INDEX "about_vision_mission_mission_points_order_idx" ON "about_vision_mission_mission_points" USING btree ("_order");
  CREATE INDEX "about_vision_mission_mission_points_parent_id_idx" ON "about_vision_mission_mission_points" USING btree ("_parent_id");
  CREATE INDEX "about_trustees_order_idx" ON "about_trustees" USING btree ("_order");
  CREATE INDEX "about_trustees_parent_id_idx" ON "about_trustees" USING btree ("_parent_id");
  CREATE INDEX "about_trustees_image_idx" ON "about_trustees" USING btree ("image_id");
  CREATE INDEX "about_faculty_stats_order_idx" ON "about_faculty_stats" USING btree ("_order");
  CREATE INDEX "about_faculty_stats_parent_id_idx" ON "about_faculty_stats" USING btree ("_parent_id");
  CREATE INDEX "contact_contact_info_details_order_idx" ON "contact_contact_info_details" USING btree ("_order");
  CREATE INDEX "contact_contact_info_details_parent_id_idx" ON "contact_contact_info_details" USING btree ("_parent_id");
  CREATE INDEX "contact_contact_info_order_idx" ON "contact_contact_info" USING btree ("_order");
  CREATE INDEX "contact_contact_info_parent_id_idx" ON "contact_contact_info" USING btree ("_parent_id");
  CREATE INDEX "contact_faqs_order_idx" ON "contact_faqs" USING btree ("_order");
  CREATE INDEX "contact_faqs_parent_id_idx" ON "contact_faqs" USING btree ("_parent_id");
  CREATE INDEX "admissions_highlights_order_idx" ON "admissions_highlights" USING btree ("_order");
  CREATE INDEX "admissions_highlights_parent_id_idx" ON "admissions_highlights" USING btree ("_parent_id");
  CREATE INDEX "admissions_timeline_order_idx" ON "admissions_timeline" USING btree ("_order");
  CREATE INDEX "admissions_timeline_parent_id_idx" ON "admissions_timeline" USING btree ("_parent_id");
  CREATE INDEX "admissions_deadlines_undergraduate_order_idx" ON "admissions_deadlines_undergraduate" USING btree ("_order");
  CREATE INDEX "admissions_deadlines_undergraduate_parent_id_idx" ON "admissions_deadlines_undergraduate" USING btree ("_parent_id");
  CREATE INDEX "admissions_deadlines_graduate_order_idx" ON "admissions_deadlines_graduate" USING btree ("_order");
  CREATE INDEX "admissions_deadlines_graduate_parent_id_idx" ON "admissions_deadlines_graduate" USING btree ("_parent_id");
  CREATE INDEX "campus_settings_stats_order_idx" ON "campus_settings_stats" USING btree ("_order");
  CREATE INDEX "campus_settings_stats_parent_id_idx" ON "campus_settings_stats" USING btree ("_parent_id");
  CREATE INDEX "campus_settings_facilities_items_features_order_idx" ON "campus_settings_facilities_items_features" USING btree ("_order");
  CREATE INDEX "campus_settings_facilities_items_features_parent_id_idx" ON "campus_settings_facilities_items_features" USING btree ("_parent_id");
  CREATE INDEX "campus_settings_facilities_items_order_idx" ON "campus_settings_facilities_items" USING btree ("_order");
  CREATE INDEX "campus_settings_facilities_items_parent_id_idx" ON "campus_settings_facilities_items" USING btree ("_parent_id");
  CREATE INDEX "campus_settings_facilities_order_idx" ON "campus_settings_facilities" USING btree ("_order");
  CREATE INDEX "campus_settings_facilities_parent_id_idx" ON "campus_settings_facilities" USING btree ("_parent_id");
  CREATE INDEX "campus_settings_amenities_order_idx" ON "campus_settings_amenities" USING btree ("_order");
  CREATE INDEX "campus_settings_amenities_parent_id_idx" ON "campus_settings_amenities" USING btree ("_parent_id");
  CREATE INDEX "placements_settings_stats_order_idx" ON "placements_settings_stats" USING btree ("_order");
  CREATE INDEX "placements_settings_stats_parent_id_idx" ON "placements_settings_stats" USING btree ("_parent_id");
  CREATE INDEX "placements_settings_highlights_order_idx" ON "placements_settings_highlights" USING btree ("_order");
  CREATE INDEX "placements_settings_highlights_parent_id_idx" ON "placements_settings_highlights" USING btree ("_parent_id");
  CREATE INDEX "home_settings_slides_order_idx" ON "home_settings_slides" USING btree ("_order");
  CREATE INDEX "home_settings_slides_parent_id_idx" ON "home_settings_slides" USING btree ("_parent_id");
  CREATE INDEX "home_settings_slides_image_idx" ON "home_settings_slides" USING btree ("image_id");
  CREATE INDEX "home_settings_stats_order_idx" ON "home_settings_stats" USING btree ("_order");
  CREATE INDEX "home_settings_stats_parent_id_idx" ON "home_settings_stats" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "college_achievements" CASCADE;
  DROP TABLE "student_achievements" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "recruiters" CASCADE;
  DROP TABLE "research_areas" CASCADE;
  DROP TABLE "faculty" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "about_vision_mission_vision_points" CASCADE;
  DROP TABLE "about_vision_mission_mission_points" CASCADE;
  DROP TABLE "about_trustees" CASCADE;
  DROP TABLE "about_faculty_stats" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "contact_contact_info_details" CASCADE;
  DROP TABLE "contact_contact_info" CASCADE;
  DROP TABLE "contact_faqs" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "admissions_highlights" CASCADE;
  DROP TABLE "admissions_timeline" CASCADE;
  DROP TABLE "admissions_deadlines_undergraduate" CASCADE;
  DROP TABLE "admissions_deadlines_graduate" CASCADE;
  DROP TABLE "admissions" CASCADE;
  DROP TABLE "campus_settings_stats" CASCADE;
  DROP TABLE "campus_settings_facilities_items_features" CASCADE;
  DROP TABLE "campus_settings_facilities_items" CASCADE;
  DROP TABLE "campus_settings_facilities" CASCADE;
  DROP TABLE "campus_settings_amenities" CASCADE;
  DROP TABLE "campus_settings" CASCADE;
  DROP TABLE "placements_settings_stats" CASCADE;
  DROP TABLE "placements_settings_highlights" CASCADE;
  DROP TABLE "placements_settings" CASCADE;
  DROP TABLE "home_settings_slides" CASCADE;
  DROP TABLE "home_settings_stats" CASCADE;
  DROP TABLE "home_settings" CASCADE;
  DROP TYPE "public"."enum_college_achievements_color";
  DROP TYPE "public"."enum_college_achievements_icon_type";
  DROP TYPE "public"."enum_student_achievements_category";
  DROP TYPE "public"."enum_gallery_category";
  DROP TYPE "public"."enum_gallery_span";
  DROP TYPE "public"."enum_events_category";
  DROP TYPE "public"."enum_events_icon_type";
  DROP TYPE "public"."enum_events_color";
  DROP TYPE "public"."enum_research_areas_icon_type";
  DROP TYPE "public"."enum_research_areas_color_theme";
  DROP TYPE "public"."enum_contact_contact_info_color";
  DROP TYPE "public"."enum_admissions_highlights_icon_type";
  DROP TYPE "public"."enum_campus_settings_stats_icon_type";
  DROP TYPE "public"."enum_campus_settings_facilities_items_icon_type";
  DROP TYPE "public"."enum_campus_settings_amenities_icon_type";
  DROP TYPE "public"."enum_placements_settings_stats_icon_type";
  DROP TYPE "public"."enum_placements_settings_highlights_icon_type";
  DROP TYPE "public"."enum_placements_settings_highlights_color_theme";
  DROP TYPE "public"."enum_home_settings_stats_color";`)
}
