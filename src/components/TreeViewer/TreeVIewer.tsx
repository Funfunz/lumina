import { useCallback } from 'react'
import type { IPageData } from '../../data/data.ts'
import type { IPageInformation } from '../../helpers/dataFetcher.ts'
import { useStore } from '@nanostores/react'
import './TreeViewer.css'
import { $pagesData } from '../../store/pagesData.ts'
import { setBackofficeLayout, type IMenuBackofficeLayout } from '../../store/backofficeLayout.ts'
import { getBackofficeLayout } from './TreeViewerStore.ts'
import { TreeLevel } from './TreeLevel.tsx'

export type TComponentData = {
	data: IPageData
  pages: IPageInformation
  selectedPage: string
}

const isHomePageSelected = (selectedPage, pageId) => {
  if (selectedPage === '' && pageId === 'homeRoot') return true

  return false
}

export default function TreeViewer() {
  const pagesData = useStore($pagesData)
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
        <div className="tree-container">
          <div className="title">
            Pages
          </div>
          <ul>
            {pagesData.pages && Object.entries(pagesData.pages).map(
              ([pageId, pageInformation], index) => (
                <li key={`${pageId}-${index}`} className={isHomePageSelected || pagesData.selectedPage === pageId ? 'selected' : ''}>
                  {pageInformation.backofficeName} - <button className="button-edit">&#9998;</button><button>X</button>
                </li>
              )
            )}
          </ul>
          <div className="action-bar">
            <button>+</button>
          </div>
        </div>
        <div className="tree-container">
          <div className="title">
            Components
          </div>
          <TreeLevel toRender={pagesData.pageData?.children}/>
          <div className="action-bar">
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
	);
}
