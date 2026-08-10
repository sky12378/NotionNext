/**
 *   HEO 主题说明
 *  > 主题设计者 [张洪](https://zhheo.com/)
 *  > 主题开发者 [tangly1024](https://github.com/tangly1024)
 *  1. 开启方式 在blog.config.js 将主题配置为 `HEO`
 *  2. 更多说明参考此[文档](https://docs.tangly1024.com/article/notionnext-heo)
 */

import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import LoadingCover from '@/components/LoadingCover'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import CategoryBar from './components/CategoryBar'
import FloatTocButton from './components/FloatTocButton'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import LatestPostsGroup from './components/LatestPostsGroup'
import { NoticeBar } from './components/NoticeBar'
import PostAdjacent from './components/PostAdjacent'
import PostCopyright from './components/PostCopyright'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
import PostRecommend from './components/PostRecommend'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import CONFIG from './config'
import { Style } from './style'
import AISummary from '@/components/AISummary'
import ArticleExpirationNotice from '@/components/ArticleExpirationNotice'

/**
 * 基础布局 采用上中下布局，移动端使用顶部侧边导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, slotTop, className } = props

  // 全屏模式下的最大宽度
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()

  const headerSlot = (
    <header>
      {/* 顶部导航 */}
      <Header {...props} />

      {/* 通知横幅 */}
      {router.route === '/' ? (
        <>
          <NoticeBar />
          <Hero {...props} />
        </>
      ) : null}
      {fullWidth ? null : <PostHeader {...props} isDarkMode={isDarkMode} />}
    </header>
  )

  // 右侧栏 用户信息+标签列表
  const slotRight =
    router.route === '/404' || fullWidth ? null : <SideRight {...props} />

  const maxWidth = fullWidth ? 'max-w-[96rem] mx-auto' : 'max-w-[86rem]' // 普通最大宽度是86rem和顶部菜单栏对齐，留空则与窗口对齐

  const HEO_HERO_BODY_REVERSE = siteConfig(
    'HEO_HERO_BODY_REVERSE',
    false,
    CONFIG
  )
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)

  // 加载wow动画
  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[var(--heo-color-bg)] dark:bg-[var(--heo-color-bg-dark)] h-full min-h-screen flex flex-col scroll-smooth`}>
      <Style />

      {/* 顶部嵌入 导航栏，首页放hero，文章页放文章详情 */}
      {headerSlot}

      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5`}>
        <div
          id='container-inner'
          className={`${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center relative z-10`}>
          <div className={`w-full h-auto ${className || ''}`}>
            {/* 主区上部嵌入 */}
            {slotTop}
            {children}
          </div>

          <div className='lg:px-2'></div>

          <div className='hidden xl:block'>
            {/* 主区快右侧 */}
            {slotRight}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />

      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {/* 文章分类条 */}
      <CategoryBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <div id='post-outer-wrapper' className='px-5  md:px-0'>
      {/* 文章分类条 */}
      <CategoryBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    // 高亮搜索结果
    if (currentSearch) {
      const timer = setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName('replace'),
          search: currentSearch,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentSearch])
  return (
    <div data-current-search={currentSearch || ''}>
      <div id='post-outer-wrapper' className='px-5  md:px-0'>
        {!currentSearch ? (
          <SearchNav {...props} />
        ) : (
          <div id='posts-wrapper'>
            {siteConfig('POST_LIST_STYLE') === 'page' ? (
              <BlogPostListPage {...props} />
            ) : (
              <BlogPostListScroll {...props} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  // 归档页顶部显示条，如果是默认归档则不显示。分类详情页显示分类列表，标签详情页显示当前标签

  return (
    <div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-[var(--heo-color-card)] dark:bg-[var(--heo-color-card-dark)]'>
      {/* 文章分类条 */}
      <CategoryBar {...props} border={false} />

      <div className='px-3'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogPostArchive
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { locale, fullWidth } = useGlobal()

  const [hasCode, setHasCode] = useState(false)

  useEffect(() => {
    const hasCode = document.querySelectorAll('[class^="language-"]').length > 0
    setHasCode(hasCode)
  }, [])

  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
    siteConfig('COMMENT_WEBMENTION_ENABLE')

  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      const timer = setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector(
              '#article-wrapper #notion-article'
            )
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
      return () => clearTimeout(timer)
    }
  }, [post, router, waiting404])
  return (
    <>
      <div
        className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-5xl'} ${hasCode ? 'xl:w-[73.15vw]' : ''}  bg-[var(--heo-color-card)] dark:bg-[var(--heo-color-bg-dark)] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4 `}>
        {/* 文章锁 */}
        {lock && <PostLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='mx-auto md:w-full md:px-5'>
            {/* 文章主体 */}
            <article id='article-wrapper'>
              {/* Notion文章主体 */}
              <section
                className='wow fadeInUp p-5 justify-center mx-auto'
                data-wow-delay='.2s'>
                <ArticleExpirationNotice post={post} />
                <AISummary aiSummary={post.aiSummary} />
                <WWAds orientation='horizontal' className='w-full' />
                {post && <NotionPage post={post} />}
                <WWAds orientation='horizontal' className='w-full' />
              </section>

              {/* 上一篇\下一篇文章 */}
              <PostAdjacent {...props} />

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <div className='px-5'>
                  {/* 版权 */}
                  <PostCopyright {...props} />
                  {/* 文章推荐 */}
                  <PostRecommend {...props} />
                </div>
              )}
            </article>

            {/* 评论区 */}
            {fullWidth ? null : (
              <div className={`${commentEnable && post ? '' : 'hidden'}`}>
                <hr className='my-4 border-dashed' />
                {/* 评论区上方广告 */}
                <div className='py-2'>
                  <AdSlot />
                </div>
                {/* 评论互动 */}
                <div className='duration-200 overflow-x-auto px-5'>
                  <div className='text-2xl dark:text-white'>
                    <i className='fas fa-comment mr-1' />
                    {locale.COMMON.COMMENTS}
                  </div>
                  <Comment frontMatter={post} className='' />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <FloatTocButton {...props} />
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  // const { meta, siteInfo } = props
  const { onLoading, fullWidth } = useGlobal()
  return (
    <>
      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}>
        <div id='error-wrapper' className={'w-full mx-auto justify-center'}>
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-700 transform order-first'
            enterFrom='opacity-0 translate-y-16'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-16'
            unmount={false}>
            {/* 404卡牌 */}
            <div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'>
              {/* 左侧动图 */}
              <LazyImage
                className='error-img h-60 md:h-full p-4'
                src={
                  'https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'
                }></LazyImage>

              {/* 右侧文字 */}
              <div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'>
                <h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>
                  404
                </h1>
                <div className='dark:text-white'>请尝试站内搜索寻找文章</div>
                <SmartLink href='/'>
                  <button className='bg-[var(--heo-color-primary)] py-2 px-4 text-[var(--heo-color-primary-text)] shadow rounded-lg hover:bg-[var(--heo-color-primary-hover)] hover:shadow-md duration-200 transition-all'>
                    回到主页
                  </button>
                </SmartLink>
              </div>
            </div>

            {/* 404页面底部显示最新文章 */}
            <div className='mt-12'>
              <LatestPostsGroup {...props} />
            </div>
          </Transition>
        </div>
      </main>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions, allPages, postCount } = props
  const { locale } = useGlobal()

  // Notion 分类色 → 渐变样式映射
  const categoryColorMap = {
    pink: 'from-pink-500/20 to-rose-500/5 border-pink-500/30',
    purple: 'from-purple-500/20 to-violet-500/5 border-purple-500/30',
    brown: 'from-amber-500/20 to-orange-500/5 border-amber-500/30',
    orange: 'from-orange-500/20 to-amber-500/5 border-orange-500/30',
    yellow: 'from-yellow-500/20 to-amber-500/5 border-yellow-500/30',
    green: 'from-emerald-500/20 to-teal-500/5 border-emerald-500/30',
    blue: 'from-blue-500/20 to-indigo-500/5 border-blue-500/30',
    red: 'from-red-500/20 to-rose-500/5 border-red-500/30',
    gray: 'from-gray-500/20 to-slate-500/5 border-gray-500/30',
    default: 'from-sky-500/20 to-indigo-500/5 border-sky-500/30'
  }

  // 按分类分组文章（保留分类对象上的 color/count）
  const categoryWithPosts = (categoryOptions || []).map(category => {
    const posts = (allPages || [])
      .filter(p => p?.category === category.name && p?.type === 'Post')
      .slice(0, 3)
    return { ...category, posts }
  })

  const totalPosts = postCount ?? (allPages || []).filter(p => p?.type === 'Post').length

  return (
    <div id='category-outer-wrapper' className='mt-8 px-5 md:px-0'>
      {/* 标题 + 统计 */}
      <div className='flex flex-col md:flex-row md:items-end md:justify-between mb-6'>
        <div className='text-4xl font-extrabold dark:text-gray-200'>
          {locale.COMMON.CATEGORY}
        </div>
        <div className='flex items-center gap-3 mt-3 md:mt-0 text-sm text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-1 bg-[var(--heo-color-card)] dark:bg-[var(--heo-color-card-dark)] px-3 py-1.5 rounded-full border border-[var(--heo-color-border)] dark:border-gray-800'>
            <HashTag className={'w-4 h-4 stroke-gray-500'} />
            <span className='font-bold text-[var(--heo-color-primary)]'>{categoryOptions?.length ?? 0}</span>
            <span>{locale.COMMON.CATEGORY}</span>
          </div>
          <div className='flex items-center gap-1 bg-[var(--heo-color-card)] dark:bg-[var(--heo-color-card-dark)] px-3 py-1.5 rounded-full border border-[var(--heo-color-border)] dark:border-gray-800'>
            <i className='fas fa-file-lines text-gray-500' />
            <span className='font-bold text-[var(--heo-color-primary)]'>{totalPosts}</span>
            <span>文章</span>
          </div>
        </div>
      </div>

      {/* 分类卡片网格 */}
      {categoryWithPosts.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {categoryWithPosts.map(category => {
            const colorCls = categoryColorMap[category.color] || categoryColorMap.default
            return (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior>
                <div
                  className={
                    'group relative overflow-hidden rounded-2xl border bg-gradient-to-br dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 ' +
                    colorCls
                  }>
                  {/* 分类头部 */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={
                          'flex items-center justify-center w-11 h-11 rounded-xl text-white text-xl shadow-lg ' +
                          'bg-gradient-to-br from-[var(--heo-color-primary)] to-[var(--heo-color-accent)]'
                        }>
                        <i className='fas fa-folder-open' />
                      </div>
                      <div>
                        <div className='text-xl font-bold dark:text-white group-hover:text-[var(--heo-color-primary)] transition-colors'>
                          {category.name}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-1 bg-[var(--heo-color-card)] dark:bg-[var(--heo-color-card-dark)] px-3 py-1.5 rounded-full text-sm font-bold text-[var(--heo-color-primary)]'>
                      <i className='fas fa-file-lines' />
                      {category.count}
                    </div>
                  </div>

                  {/* 最新文章预览 */}
                  {category.posts?.length > 0 && (
                    <div className='space-y-2.5'>
                      {category.posts.map(post => (
                        <div
                          key={post.id}
                          className='flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-[var(--heo-color-card)] dark:hover:bg-[var(--heo-color-card-dark)] transition-colors'>
                          {post.pageCoverThumbnail ? (
                            <div className='w-14 h-10 shrink-0 overflow-hidden rounded-md'>
                              <LazyImage
                                src={post.pageCoverThumbnail}
                                className='object-cover w-full h-full'
                              />
                            </div>
                          ) : (
                            <div className='w-14 h-10 shrink-0 flex items-center justify-center rounded-md bg-[var(--heo-color-card-muted)] text-gray-400'>
                              <i className='fas fa-file-lines' />
                            </div>
                          )}
                          <div className='flex-1 min-w-0'>
                            <div className='text-sm font-medium dark:text-gray-200 truncate'>
                              {post.title}
                            </div>
                            <div className='text-xs text-gray-500 dark:text-gray-400'>
                              {post.publishDay || post.date?.start_date || ''}
                            </div>
                          </div>
                          <i className='fas fa-arrow-right text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0' />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 查看更多 */}
                  <div className='mt-4 pt-3 border-t border-[var(--heo-color-border)] dark:border-gray-700 flex items-center justify-center gap-2 text-sm text-[var(--heo-color-primary)] opacity-0 group-hover:opacity-100 transition-opacity'>
                    <span>查看全部 {category.count} 篇文章</span>
                    <i className='fas fa-arrow-right' />
                  </div>
                </div>
              </SmartLink>
            )
          })}
        </div>
      ) : (
        <div className='text-center text-gray-500 dark:text-gray-400 py-20'>
          暂无分类
        </div>
      )}
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  return (
    <div id='tag-outer-wrapper' className='px-5 mt-8 md:px-0'>
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>
        {locale.COMMON.TAGS}
      </div>
      <div
        id='tag-list'
        className='duration-200 flex flex-wrap space-x-5 space-y-5 m-10 justify-center'>
        {tagOptions.map(tag => {
          return (
            <SmartLink
              key={tag.name}
              href={`/tag/${tag.name}`}
              passHref
              legacyBehavior>
              <div
                className={
                  'group flex flex-nowrap items-center border bg-[var(--heo-color-card)] text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-[var(--heo-color-primary-text)] hover:bg-[var(--heo-color-primary)] transition-all hover:scale-110 duration-150'
                }>
                <HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />
                {tag.name}
                <div className='bg-[var(--heo-color-card-muted)] ml-1 px-2 rounded-lg group-hover:text-[var(--heo-color-primary)] '>
                  {tag.count}
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
