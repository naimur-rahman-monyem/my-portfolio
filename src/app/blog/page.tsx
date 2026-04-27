"use client";

import { allPosts } from "content-collections";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useState, useMemo } from "react";
import { paginate, normalizePage } from "@/lib/pagination";

const PAGE_SIZE = 5;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const postVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const paginationVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.3 },
  },
};

const emptyVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const posts = allPosts;
  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [posts]
  );

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const normalizedPage = normalizePage(String(currentPage), totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: normalizedPage,
    pageSize: PAGE_SIZE,
  });

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-50"
        style={{ scaleX }}
      />

      <section id="blog">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.h1
            className="text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2"
          >
            <motion.span
              initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring", bounce: 0.5 }}
            >
              <BookOpen className="size-5 inline-block mr-1 text-muted-foreground" />
            </motion.span>
            Blog
            <motion.span
              className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.3, type: "spring", bounce: 0.4 }}
            >
              {sortedPosts.length} posts
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            My thoughts on software development, life, and more.
          </motion.p>
        </motion.div>

        {paginatedPosts.length > 0 ? (
          <>
            {/* Post list */}
            <motion.div
              className="flex flex-col gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={normalizedPage} // re-animate on page change
            >
              {paginatedPosts.map((post, id) => {
                const slug = post._meta.path.replace(/\.mdx$/, "");
                const indexNumber =
                  (pagination.page - 1) * PAGE_SIZE + id + 1;

                return (
                  <motion.div key={slug} variants={postVariants}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Link
                        className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        href={`/blog/${slug}`}
                      >
                        {/* Index number with animated underline */}
                        <motion.span
                          className="text-xs font-mono tabular-nums font-medium mt-[5px] text-muted-foreground"
                          whileHover={{ color: "var(--foreground)" }}
                        >
                          {String(indexNumber).padStart(2, "0")}.
                        </motion.span>

                        <div className="flex flex-col gap-y-2 flex-1">
                          {/* Title with hover underline */}
                          <p className="tracking-tight text-lg font-medium relative">
                            <span className="group-hover:text-foreground transition-colors">
                              {post.title}
                              <motion.span
                                className="inline-block ml-1"
                                initial={{ opacity: 0, x: -8 }}
                                whileHover={{ opacity: 1, x: 0 }}
                              >
                                <ChevronRight
                                  className="inline-block size-4 stroke-3 text-muted-foreground"
                                  aria-hidden
                                />
                              </motion.span>
                            </span>
                            {/* Animated underline on hover */}
                            <motion.span
                              className="absolute bottom-0 left-0 h-[1px] bg-foreground/30"
                              initial={{ scaleX: 0, originX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              style={{ width: "100%" }}
                            />
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {post.publishedAt}
                          </p>
                        </div>
                      </Link>
                    </motion.div>

                    {/* Separator line */}
                    {id < paginatedPosts.length - 1 && (
                      <motion.div
                        className="mt-5 h-px bg-border"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.1 + id * 0.05, duration: 0.4 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <motion.div
                variants={paginationVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-3 flex-row items-center justify-between mt-8"
              >
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <div className="flex gap-2 sm:justify-end">
                  {/* Previous */}
                  {pagination.hasPreviousPage ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handlePageChange(pagination.page - 1)}
                      className="h-8 w-fit px-3 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Previous
                    </motion.button>
                  ) : (
                    <span className="h-8 w-fit px-3 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Previous
                    </span>
                  )}

                  {/* Page numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handlePageChange(page)}
                          className={`h-8 w-8 flex items-center justify-center text-sm rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                            page === pagination.page
                              ? "bg-foreground text-background border-foreground font-medium"
                              : "border-border hover:bg-accent/50"
                          }`}
                        >
                          {page}
                        </motion.button>
                      )
                    )}
                  </div>

                  {/* Next */}
                  {pagination.hasNextPage ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handlePageChange(pagination.page + 1)}
                      className="h-8 w-fit px-3 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Next
                    </motion.button>
                  ) : (
                    <span className="h-8 w-fit px-3 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            variants={emptyVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <BookOpen className="size-8 text-muted-foreground mb-3" />
            </motion.div>
            <p className="text-muted-foreground text-center">
              No blog posts yet. Check back soon!
            </p>
          </motion.div>
        )}
      </section>
    </>
  );
}