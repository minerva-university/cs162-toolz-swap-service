function headerProvider(isLoginProtected) {
    const defaultHeaders = {
        //'Access-Control-Allow-Origin': '*',
        //'Content-Type': 'application/json',
        'Content-Length': '',
        'Content-Type': 'application/json',
        'Host': '127.0.0.1:8000',
        'Cookie': '',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) \A' +
            'ppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
        
    }
    const headers = new Headers(defaultHeaders)
    if (isLoginProtected) {
        const token = window.sessionStorage.getItem('jwtToken')
        const memberId = window.sessionStorage.getItem('memberId')
        const userId = window.sessionStorage.getItem('userId')
        // Add authorization headers to request
        headers.append('Token', token)
        headers.append('Member-Id', memberId)
        headers.append('User-Id', userId)
    }
    return headers
}

export default headerProvider;