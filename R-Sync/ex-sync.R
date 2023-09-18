source(file.path(here::here("needs.R")))
needs(magrittr)

set.seed(512)
do.call(rep, input) %>%
  strsplit(NULL) %>%
  sapply(sample) %>%
  apply(2, paste, collapse = "")
