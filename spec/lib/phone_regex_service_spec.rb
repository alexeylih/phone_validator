require 'phone_regex_service'
require 'benchmark'

describe PhoneRegexService, "#valid?" do

	it "should return false for 3489ut8934u89ty (invalid input)" do
		expect(PhoneRegexService.valid?('3489ut8934u89ty')).to be_false
	end

	it "should return true for 0543939602 (valid mobile phone)" do
		expect(PhoneRegexService.valid?('0543939602')).to be_true
	end

	it "should return true for +972543939602 (valid mobile phone with country code)" do
		expect(PhoneRegexService.valid?('+972543939602')).to be_true
	end

	it "should return false for 972543939602 (valid number but without +)" do
		expect(PhoneRegexService.valid?('972543939602')).to be_false
	end

	it "should return true for 039992233 (valid landline)" do
		expect(PhoneRegexService.valid?('039992233')).to be_true
	end

	it "should return false for 0039992233 (invalid landline)" do
		expect(PhoneRegexService.valid?('0039992233')).to be_false
	end

	it "should return false for +9720543939602 (mobile with country code and 0)" do
		expect(PhoneRegexService.valid?('+9720543939602')).to be_false
	end

	it "should return true for 0777861234 (new operator mobile numver)" do
		expect(PhoneRegexService.valid?('0777861234')).to be_true
	end

	context 'performance' do
		
		it "should validate 1000 times in less than 2ms" do
			time = Benchmark.realtime do
	          	1000.times do
	          		PhoneRegexService.valid?('+9720543939602')
	          	end
	        end

	        expect(time*1000).to be < 2
		end
	end

end