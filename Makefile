
.DEFAULT_GOAL := all

include scripts/Makefile.angular
include scripts/Makefile.docker
include scripts/Makefile.k8s
include scripts/Makefile.common
