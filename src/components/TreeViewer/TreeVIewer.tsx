import { useCallback } from 'react'
import type { IPageData } from '../../data/data.ts'
import type { IPageInformation } from '../../helpers/dataFetcher.ts'
import { useStore } from '@nanostores/react'
import './TreeViewer.css'
import { setBackofficeLayout, type IMenuBackofficeLayout } from '../../store/main.ts'
import { getBackofficeLayout } from './TreeViewerStore.ts'

export type TComponentData = {
	data: IPageData
  pages: IPageInformation
  selectedPage: string
}

const isHomePageSelected = (selectedPage, pageId) => {
  if (selectedPage === undefined && pageId === 'homeRoot') return true

  return false
}

export default function TreeViewer({
	data,
  pages,
  selectedPage
}: TComponentData) {
  const backofficeLayout = useStore(getBackofficeLayout<IMenuBackofficeLayout>('menu'))
  const handleBurgerToggle = useCallback(
    () => {
      setBackofficeLayout('menu', {...backofficeLayout, open: !backofficeLayout.open})
    }, [backofficeLayout]
  )
	return (
    <div className={`editor-sidebar ${backofficeLayout.open ? 'open' : 'close'}`}>
      <input type="checkbox" onClick={handleBurgerToggle} role="button" aria-label="Display the menu" className="burger"/>
      <div className='editor-sidebar-content'>
        <div className="title">
          Pages
        </div>
        <ul>
          {Object.entries(pages).map(
            ([pageId, pageInformation]) => (
              <li className={isHomePageSelected || selectedPage === pageId ? 'selected' : ''}>
                {pageInformation.backofficeName}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
	);
}
