import { Card, CardContent, CardFooter } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const MembershipCard = ({ membership, isPopular, onSelect }) => {
  return (
    <Card className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
      isPopular ? "ring-2 ring-primary shadow-lg" : ""
    }`}>
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white text-center py-2 text-sm font-semibold">
          가장 인기있는 선택
        </div>
      )}
      
      <CardContent className={`p-8 ${isPopular ? "pt-12" : ""}`}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-text mb-2">
            {membership.name}
          </h3>
          <div className="text-4xl font-bold text-primary mb-1">
            ₩{membership.price.toLocaleString()}
          </div>
          <p className="text-gray-500 text-sm">한 번만 결제</p>
        </div>
        
        <div className="space-y-4">
          {membership.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <ApperIcon name="Check" size={16} className="text-success mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-8 pt-0">
        <Button 
          variant={isPopular ? "primary" : "secondary"}
          size="lg"
          className="w-full"
          onClick={() => onSelect(membership)}
        >
          {membership.tier === "jun" ? "준 멤버십 선택" : "마스터 멤버십 선택"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MembershipCard