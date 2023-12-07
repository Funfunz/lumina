import { useCallback } from 'react'
import type { IComponentData, IPageData } from '../../data/data.ts'
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

function levelBuilder(children: IComponentData[]) {
  return (
    <ul>
      {children.sort((a, b) => {
        return a.order - b.order
      }).map((component, index) => (
        <li>
          {component.friendlyName} - {(index > 0) ? (<button className="button-arrow-up">&#8593;</button>) : undefined}
          {(index + 1 < children.length) ? (<button className="button-arrow-down">&#8595;</button>) : undefined}
          <button>+</button>
          <button className="button-edit">&#9998;</button>
          <button>X</button>
          {component.children && levelBuilder(component.children)}
        </li>
      ))}
    </ul>
  )
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
        <div className="tree-container">
          <div className="title">
            Pages
          </div>
          <ul>
            {Object.entries(pages).map(
              ([pageId, pageInformation]) => (
                <li className={isHomePageSelected || selectedPage === pageId ? 'selected' : ''}>
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
          {data.children && levelBuilder(data.children)}
          <div className="action-bar">
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
	);
}
