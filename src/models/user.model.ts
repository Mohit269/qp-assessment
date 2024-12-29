import  supabase  from "../config/supabase";

const createSchemaAndTable = async () => {
  // Create Schema if it doesn't exist
  const createSchemaQuery = `
    CREATE SCHEMA IF NOT EXISTS my_schema;
  `;
  
  const { data: schemaData, error: schemaError } = await supabase
    .rpc('execute_sql', { query: createSchemaQuery });

  if (schemaError) {
    console.error('Error creating schema:', schemaError);
    return;
  }

  console.log('Schema created successfully:', schemaData);

  // Create Table within that schema
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS my_schema.user (
      _id SERIAL PRIMARY KEY,
      userName VARCHAR(255) NOT NULL,
      quantityPerKilo NUMERIC,
      quantityPerPiece NUMERIC,
      totalPrice NUMERIC
    );
  `;
  
  const { data: tableData, error: tableError } = await supabase
    .rpc('execute_sql', { query: createTableQuery });

  if (tableError) {
    console.error('Error creating table:', tableError);
    return;
  }

  console.log('Table created successfully:', tableData);
};

createSchemaAndTable().catch(console.error);
