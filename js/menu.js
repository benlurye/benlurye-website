const SUPABASE_URL = 'https://nrgfotpajkxivymytcwd.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTYxMDQzMiwiZXhwIjoxOTQxMTg2NDMyfQ.MqNEva1INOX5L2BXWimYATS3G_0nvOeRf7K5PgLiVOs'

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const index = () => {
    return supabaseClient.from('menu')
      .select('*')
      .then( (results) => { return results.data; } );
  }
  const show = (id) => {
    return supabaseClient.from('menu')
      .select('*')
      .eq('id', id)
      .then( (results) => { return results.data[0]; } );
  }
  const create = (appt) => {
    return supabaseClient.from('menu')
      .insert([appt])
      .then( (results) => { return results.data[0]; } );
  }
  const destroy = (id) => {
    return supabaseClient.from('menu')
      .delete()
      .eq('id', id)
      .then( (results) => { return results.data[0]; } );
  }
  const update = (id, changes) => {
    return supabaseClient.from('menu')
      .update(changes)
      .eq('id', id)
      .then( (results) => { return results.data[0]; } );
  }