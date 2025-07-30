import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import MembershipCard from "@/components/molecules/MembershipCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import membershipService from "@/services/api/membershipService"

const MembershipOptions = () => {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    loadMemberships()
  }, [])
  
  const loadMemberships = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await membershipService.getAll()
      setMemberships(data)
    } catch (err) {
      setError("멤버십 정보를 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }
  
  const handleSelectMembership = async (membership) => {
    try {
      toast.info("결제 처리 중입니다...")
      const result = await membershipService.purchase(membership.Id, {
        name: "테스트 사용자",
        email: "test@example.com"
      })
      
      if (result.success) {
        navigate("/payment-success", { 
          state: { 
            membership: membership.name,
            transactionId: result.transactionId 
          }
        })
      }
    } catch (err) {
      toast.error("결제 처리 중 오류가 발생했습니다.")
    }
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadMemberships} />
  if (memberships.length === 0) return <Empty message="이용 가능한 멤버십이 없습니다." />
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {memberships.map((membership) => (
        <MembershipCard
          key={membership.Id}
          membership={membership}
          isPopular={membership.tier === "master"}
          onSelect={handleSelectMembership}
        />
      ))}
    </div>
  )
}

export default MembershipOptions