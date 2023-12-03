const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    const client = new faunadb.Client({
      secret: 'fnAFUPLoj7AARAqDJ3hdIprhWQMfUH4xHTW3SQm4'
    });

    const response = await client.query(
      q.Let(
        {
          documents: q.Paginate(q.Documents(q.Collection('Trails'))),
          randomIndex: q.Floor(q.Random() * q.Count(q.Var('documents'))),
          randomRef: q.Select(q.Var('randomIndex'), q.Var('documents')),
          randomDoc: q.Get(q.Var('randomRef'))
        },
        q.Var('randomDoc')
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' })
    };
  }
};