import SmartLink from '@/components/SmartLink'

/**
 * 最新文章列表（纯文字版，不加载头图以提升加载速度）
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts, siteInfo }) => {
  if (!latestPosts) {
    return <></>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
      {latestPosts.map(post => (
        <SmartLink
          key={post.id}
          passHref
          title={post.title}
          href={post?.href}
          className={
            'flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--heo-color-border)] dark:border-gray-800 bg-[var(--heo-color-card)] dark:bg-[var(--heo-color-card-dark)] hover:border-[var(--heo-color-primary)] transition-all duration-200 group'
          }>
          <i className='fas fa-file-lines text-[var(--heo-color-primary)] shrink-0' />
          <div className='flex-1 min-w-0'>
            <div className='font-bold text-sm dark:text-white line-clamp-1 group-hover:text-[var(--heo-color-primary)] transition-colors'>
              {post.title}
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
              {post.publishDay || post.date?.start_date || ''}
            </div>
          </div>
          <i className='fas fa-arrow-right text-gray-400 group-hover:text-[var(--heo-color-primary)] transition-colors shrink-0' />
        </SmartLink>
      ))}
    </div>
  )
}
export default LatestPostsGroup
