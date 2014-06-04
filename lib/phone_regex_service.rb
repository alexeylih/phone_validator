require "benchmark"

class PhoneRegexService

	NUMBER_VALIDATION_REGEX = 
	/^((\+972)|0)(2|3|4|8|9|5[0,2-9]|7(2|3|4|6|7|8))-?\d{7}$/

	def self.valid?(number)
		(number =~ NUMBER_VALIDATION_REGEX) == 0
	end
end
