// Root canvas page — Server Component shell.
// Section IDs match TOKEN_SECTION_MAP in lib/scrollHighlight.ts.

import { AIStudioSection }      from '@/components/canvas/AIStudioSection'
import { ButtonsSection }       from '@/components/canvas/ButtonsSection'
import { CardsSection }         from '@/components/canvas/CardsSection'
import { ColorsSection }        from '@/components/canvas/ColorsSection'
import { DataSection }          from '@/components/canvas/DataSection'
import { FeedbackBoardSection } from '@/components/canvas/FeedbackBoardSection'
import { FeedbackSection }      from '@/components/canvas/FeedbackSection'
import { FormsSection }         from '@/components/canvas/FormsSection'
import { InteractionsSection }  from '@/components/canvas/InteractionsSection'
import { MobileSection }        from '@/components/canvas/MobileSection'
import { NavigationSection }    from '@/components/canvas/NavigationSection'
import { OverlaysSection }      from '@/components/canvas/OverlaysSection'
import { TypographySection }    from '@/components/canvas/TypographySection'

export default function Page() {
  return (
    <main>
      <ColorsSection />
      <TypographySection />
      <ButtonsSection />
      <FormsSection />
      <CardsSection />
      <NavigationSection />
      <FeedbackSection />
      <DataSection />
      <OverlaysSection />
      <InteractionsSection />
      <MobileSection />
      <FeedbackBoardSection />
      <AIStudioSection />
    </main>
  )
}
