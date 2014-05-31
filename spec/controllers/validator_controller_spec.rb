require 'spec_helper'

describe ValidatorController do

	it "should validate phone numer" do
		get :validate_number
	end

end
