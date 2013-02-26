require 'rack/contrib/try_static'

use Rack::TryStatic,
    root: "public",
    urls: %w[/],
    try: ['.html', 'index.html', '/index.html']

run lambda {|env| [404, {}, []]}
