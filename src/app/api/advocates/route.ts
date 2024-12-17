import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import db from "../../../db";
import * as schema from "../../../db/schema";
import {  asc, desc, ilike, or, sql } from "drizzle-orm";

export async function GET(request: Request) {

  // Parse the query parameters
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const sortColumn = searchParams.get("sortColumn") ?? null;
  const sortDirection = searchParams.get("sortDirection") ?? "asc";
  const filterField = searchParams.get("filterField") ?? null;
  const filterValue = searchParams.get("filterValue") ?? "";

  //TODO: We need validation around what are accepted search params. Right now we are just ignoring if invalid.

  let finalQuery: any = (db as PostgresJsDatabase<typeof schema>)
    .select()
    .from(schema.advocates);

  if (searchTerm) {
    finalQuery = finalQuery.where(
      or(
        ilike(schema.advocates.firstName, `%${searchTerm}%`),
        ilike(schema.advocates.firstName, `%${searchTerm}%`),
        ilike(schema.advocates.degree, `%${searchTerm}%`),
      ),  
    );
  }

  // Right now we only support sorting by years
  if (sortColumn === "years" && sortDirection) {
    if (sortDirection === "asc") {
      finalQuery = finalQuery.orderBy(asc(schema.advocates.yearsOfExperience));
    } else {
      finalQuery = finalQuery.orderBy(desc(schema.advocates.yearsOfExperience));
    }
  }

  const data = await finalQuery;

  // TODO: In the alloted time, I was unable to successfully write a query for the jsonb specialties field. I opted to filter after the fact on this iteration.
  // Right now we only support filtering by specialty
  if (filterField === "specialty" && filterValue) {
    const filteredData = data?.filter(x=>x.specialties.some(y=>y === filterValue)) ?? []

      return Response.json({ data: filteredData });

    // finalQuery.where(
    //   sql`
    //  ${schema.advocates.specialties.name}::jsonb @> ${JSON.stringify(
    //     filterValue
    //   )}::jsonb`
    // );
  }

  return Response.json({ data });
}
