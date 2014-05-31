require 'net/http'

uri = URI('http://localhost:3000/validator/validate')

100.times {
  5.times.map {
    Thread.new { Net::HTTP.get_response(uri) }
  }.each(&:join)
}