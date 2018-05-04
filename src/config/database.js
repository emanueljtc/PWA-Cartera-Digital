export default {
  'name': 'moneyko-app',
  'entities': {
    'users': '++id,first_name,last_name,email,synced,created_at,updated_at',
    'queues': '++id,uuid,data,request_header,api,status,modified_at,retries,response_code,response_header,response_body,sequence_number',
    'ingresos': '++id, ingreso'
  }
}
