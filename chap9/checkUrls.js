import superagent from 'superagent'

export class CheckUrls {
  constructor(urls){
    this.urls = urls
  }

  async * [Symbol.asyncIterator]() {
    for (const url of this.urls) {
      try {
        const checkResult = await superagent
          .head(url)
          .redirects(2)
        yield `${url} is up, status: ${checkResult.status}`
      } catch (err) {
        yield `${url} is down, error: ${err.message}`
      }
    }
  }
}

async function main() {
  const checkUrls = new CheckUrls([
    'https://github.com/cheezedoodles',
    'https://example.com',
    'https://mustbedownforsurehopefully.com'
  ])
  for await (const status of checkUrls) {
    console.log(status)
  }
}

main()