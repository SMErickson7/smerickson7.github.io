# Local preview that matches GitHub Pages.
#
# One-time setup (needs Ruby installed):
#   bundle install
#
# Preview with live reload at http://localhost:4000/new/
#   bundle exec jekyll serve --livereload
#
# Add --drafts to also show posts in _drafts (they are never published).
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "webrick"

# Newer Ruby versions (3.4 and up) no longer bundle these libraries,
# but the Jekyll version GitHub Pages uses still expects them.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "ostruct"

# Windows needs these for time zones and file watching.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.1", platforms: [:mingw, :x64_mingw, :mswin]
