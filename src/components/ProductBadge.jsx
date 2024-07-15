const ProductBadge = ({badge}) => {

    if (badge === "choice") {
        return (
            <>
                <span className='text-xs xl:text-sm bg-slate-800 text-white p-1'>Amazon's</span>
                <span className='text-orange-500'>Choice</span>
            </>
        )
    }
    else if (badge === "seller") {
        return (
            <span className='text-xs xl:text-sm bg-orange-500 text-white p-1'>Amazon's Choice</span>
        )
    }
    else if (badge === "limited") {
        return (
            <span className='text-xs xl:text-sm bg-orange-500 text-white p-1'>Amazon's Choice</span>
        )
    }


  return (
    <div>
      
    </div>
  )
}

export default ProductBadge
