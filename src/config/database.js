export default {
  'name': 'moneyko-app',
  'entities': {
    'users': '++id,first_name,last_name,email,synced,created_at,updated_at',
    'queues': '++id,uuid,data,request_header,api,status,modified_at,retries,response_code,response_header,response_body,sequence_number',
    'ingresos': '++id, ingreso',
    'egresos': '++id, egreso, frecuencia, cantidad, cantidadMensual',
    'gastos': '++id, gasto, frecuencia, cantidad, cantidadMensual',
    'deuda': '++id, exist, deuda, frecuencia, cantidad, cantidadMensual',
    'metas': '++id, exist, meta, proposito'
  }
}
