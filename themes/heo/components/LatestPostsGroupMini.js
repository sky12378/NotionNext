import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 最新文章列表（纯文字版，不加载头图以提升加载速度）
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
export default function LatestPostsGroupMini({ latestPosts, siteInfo }) {
  // 获取当前路径
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()
  const SUB_PATH = siteConfig('SUB_PATH', '')

  return latestPosts ? (
    <>
      <div className=' mb-2 px-1 flex flex-nowrap justify-between'>
        <div>
          <i className='mr-2 fas fas fa-history' />
          {locale.COMMON.LATEST_POSTS}
        </div>
      </div>
      {latestPosts.map(post => {
        const selected =
          currentPath === `${SUB_PATH}/${post.slug}`

        return (
          <SmartLink
            key={post.id}
            title={post.title}
            href={post?.href}
            passHref
            className={'my-2 flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--heo-color-card)] dark:hover:bg-[var(--heo-color-card-dark)] transition-colors'}>
            <i className='fas fa-angle-right text-xs text-[var(--heo-color-primary)] shrink-0' />
            <div
              className={
                (selected ? ' text-[var(--heo-color-primary)] ' : 'dark:text-gray-200') +
                ' text-sm overflow-x-hidden hover:text-[var(--heo-color-primary)] duration-200 w-full rounded ' +
                ' dark:hover:text-[var(--heo-color-accent)] cursor-pointer items-center flex'
              }>
              <div>
                <div className='line-clamp-2 menu-link'>{post.title}</div>
                <div className='text-gray-400 text-xs'>{post.lastEditedDay}</div>
              </div>
            </div>
          </SmartLink>
        )
      })}
    </>
  ) : null
}
