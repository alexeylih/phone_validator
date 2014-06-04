class ValidatorController < ApplicationController

	def validate_number
		render json: PhoneRegexService.valid?(params[:number])
	end

end
	