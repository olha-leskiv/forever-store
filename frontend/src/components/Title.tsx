interface Props {
    text1: string;
    text2: string;
}

const Title = ({ text1, text2 } : Props) => {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <p className="text-gray-500 uppercase">{text1} <span className="font-medium text-gray-700">{text2}</span></p>
      <p className="w-8 h-px sm:w-12 sm:h-0.5 bg-gray-700"/>
    </div>
  )
}

export default Title
