import { Header } from '@/presentation/components/ui/header'
import { useHeader } from '@/presentation/hooks/use-header'

interface HeaderWrapperProps {
  children: React.ReactNode
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ children }) => {
  const { shouldShowHeader, isDashboard } = useHeader()

  return (
    <>
      <Header isDashboard={isDashboard} shouldShowHeader={shouldShowHeader} />
      {children}
    </>
  )
}
